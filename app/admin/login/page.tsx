import type { Metadata } from 'next';import AdminLogin from './AdminLogin'
export const metadata:Metadata={title:'Admin Login',robots:{index:false,follow:false}}
export default function AdminLoginPage(){return <AdminLogin/>}
