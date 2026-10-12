import { NextResponse } from 'next/server'
import { authenticate,createAdminSession } from '@/lib/admin-auth'

const attempts = new Map<string,{count:number;reset:number}>()
export async function POST(request:Request){
  const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown',now=Date.now(),entry=attempts.get(ip)
  if(entry&&entry.reset>now&&entry.count>=8)return NextResponse.json({error:'Too many attempts. Try again in 15 minutes.'},{status:429})
  if(!entry||entry.reset<=now)attempts.set(ip,{count:0,reset:now+15*60*1000})
  const body=await request.json().catch(()=>({}));const admin=await authenticate(String(body.email||''),String(body.password||''))
  if(!admin){const current=attempts.get(ip)!;current.count+=1;return NextResponse.json({error:'Invalid email or password.'},{status:401})}
  attempts.delete(ip);await createAdminSession(admin.id);return NextResponse.json({admin})
}
