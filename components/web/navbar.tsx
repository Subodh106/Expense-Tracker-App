"use client"
import {useState } from 'react'
import { Button } from '../ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';

const Navbar = ({username}:{username:string}) => {
    const router = useRouter();
    const[loading , setLoading] = useState(false)
    const handleLogOut = async()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/user/log-out")
            if(response.status===200){
                toast.success("Logout user successfully");
                router.push("/auth/log-in")
            }
        } catch (error:any) {
            toast.error(error?.response?.data?.message||"Logout failder")
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <nav className='flex justify-between items-center px-4 py-2 border-b bg-blue-900'>
        <div >
            <h1 className='text-xl font-semibold p-2 text-white'>ETA</h1>
        </div>
        <div className='flex justify-center items-center gap-4 p-1 mx-4'>
            <span className='text-sm text-white font-bold'>
                {username}
            </span>
            <Separator color='white' orientation='vertical' className='border h-5'/>
            <span>
                <Button onClick={handleLogOut} className='cursor-pointer w-full mx-auto' disabled={loading}>
                    <User/>
                    {loading?"Loggin out":"Log Out"}
                </Button>
            </span>
        </div>
    </nav>
  )
}

export default Navbar