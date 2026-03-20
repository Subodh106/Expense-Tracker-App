
import Navbar from "@/components/web/navbar";
import { getUser } from "@/helpers/getUser";
import { ReactNode } from "react";
import { redirect } from "next/navigation";


export default async function dashboardLayout({children}:{children:ReactNode}){
        const user = await getUser();
        console.log(user)

    
    return(
        <>
            <Navbar username = {"user"}/>
            {children}
        </>
    )
}