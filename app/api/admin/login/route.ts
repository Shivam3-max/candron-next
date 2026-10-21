import { NextResponse } from 'next/server'
import { authenticate,createAdminSession } from '@/lib/admin-auth'

const WINDOW = 15 * 60 * 1000
const MAX_PER_IP = 8
const MAX_PER_ACCOUNT = 50 // stops brute force that rotates IPs / X-Forwarded-For
const attempts = new Map<string,{count:number;reset:number}>()

// The left-most X-Forwarded-For entry is client-controlled; the right-most was added by the proxy in front of us
function clientIp(request:Request){
  const forwarded=request.headers.get('x-forwarded-for')?.split(',').map(part=>part.trim()).filter(Boolean)
  return forwarded?.at(-1)||request.headers.get('x-real-ip')||'unknown'
}
function blocked(key:string,limit:number,now:number){const entry=attempts.get(key);return Boolean(entry&&entry.reset>now&&entry.count>=limit)}
function fail(key:string,now:number){const entry=attempts.get(key);if(!entry||entry.reset<=now)attempts.set(key,{count:1,reset:now+WINDOW});else entry.count+=1}

export async function POST(request:Request){
  const now=Date.now(),ip=`ip:${clientIp(request)}`
  if(attempts.size>5000)for(const [key,entry] of attempts)if(entry.reset<=now)attempts.delete(key)
  const body=await request.json().catch(()=>({})),email=String(body.email||'').toLowerCase().trim(),account=`acct:${email}`
  if(blocked(ip,MAX_PER_IP,now)||blocked(account,MAX_PER_ACCOUNT,now))return NextResponse.json({error:'Too many attempts. Try again in 15 minutes.'},{status:429})
  let admin
  try{admin=await authenticate(email,String(body.password||''))}catch(error){
    console.error('[admin-login] Database unavailable:',error instanceof Error?error.message:error)
    return NextResponse.json({error:'Sign-in is temporarily unavailable. Please try again shortly.'},{status:503})
  }
  if(!admin){fail(ip,now);fail(account,now);return NextResponse.json({error:'Invalid email or password.'},{status:401})}
  attempts.delete(ip);await createAdminSession(admin.id,admin.nonce);return NextResponse.json({admin:{id:admin.id,email:admin.email}})
}
