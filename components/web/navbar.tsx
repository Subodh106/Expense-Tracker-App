"use client"
import {useState } from 'react'
import { Button } from '../ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Navbar = () => {
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
    <nav className='flex justify-between items-center px-4 py-2 border-b'>
        <div >
            <h1 className='text-xl font-semibold p-2'>ETA</h1>
        </div>
        <div className='flex justify-center items-center gap-4 p-1 mx-4'>
            <span className='text-sm text-gray-600'>
                User
            </span>
            <span>
                <Button onClick={handleLogOut} className='cursor-pointer w-full mx-auto' disabled={loading}>
                    {loading?"Loggin out":"Log Out"}
                </Button>
            </span>
        </div>
    </nav>
  )
}

export default Navbar