'use client'
import Navbar from "@/components/web/navbar";
import { getuser } from "@/helpers/getUser"; 
import { ReactNode, useEffect, useState } from "react";;
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/context/userContext"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const {setUsername , username} = useUser()
    // const [username,setUsername] = useState("");
    const [loading , setLoading] = useState(true);
    const router = useRouter();
    useEffect(()=>{
        getUserData();
    },[router])
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
            console.log(username)
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