"use server"
import { cookies } from "next/headers";

export  async function getCookie() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        return token;
    } catch (error:any) {
        console.log("Error during retriving token:",error.message);
        return Response.json({message:"Error during retriving token",error:error.message},{status:500})
    }
}