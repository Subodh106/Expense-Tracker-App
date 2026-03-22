'use client'
import Navbar from "@/components/web/navbar";
import { getuser } from "@/helpers/getUser"; 
import { ReactNode, useEffect, useState } from "react";;
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [username,setUsername] = useState("");
    const [loading , setLoading] = useState(true);
    const router = useRouter();
    useEffect(()=>{
        getUserData();
    },[router])

    console.log(router)
    const getUserData = async()=>{
        try {
            setLoading(true)
            const response = await getuser();
            if(!response.user || !response.success){
                router.push("/auth/log-in")
            }
            setUsername(response?.user?.data?.username)
        } catch (errors:any) {
            toast.error(errors?.error||"Something went wrong")
        }
        finally{
            setLoading(false)
        }
    }
    if(loading){
        return null
    }
    return (
        <>
            <Navbar username={username} />
            <main>
                {children}
            </main>
        </>
    );
}