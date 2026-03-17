"use server"
import { cookies } from "next/headers";

export  async function getCookie() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        const hascookies = cookieStore.has("token")
        if(!hascookies){
            return "Cookies doesn't exist"
        }
        console.log(hascookies)
        console.log(token)
        return token;
    } catch (error:any) {
        console.log("Error during retriving token:",error.message);
        return Response.json({message:"Error during retriving token",error:error.message},{status:500})
    }
}