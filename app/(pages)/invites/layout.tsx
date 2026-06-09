"use client"
import Navbar from "@/components/web/navbar";
import { useUser } from "@/context/userContext";

export default function InviteLayout({children}:{children:React.ReactNode}){
    const {username} = useUser();
    return<>
        <Navbar username={username}/>
        <main>
            {children}
        </main>
    </>
}