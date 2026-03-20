import Navbar from "@/components/web/navbar";
import axios from "axios";
import { ReactNode, useEffect } from "react";


export default function dashboardLayout({children}:{children:ReactNode}){
    const getdata = async()=>{
        await axios.get("/api/user/get-data")
    }
    useEffect(()=>{
        getdata();
    },[])
    return(
        <>
            <Navbar/>
            {children}
        </>
    )
}