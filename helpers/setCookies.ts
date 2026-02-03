"use server"
import { cookies } from "next/headers"

export const setCookies =  async (token:string) => {
    const cookiesStore = await cookies();
    cookiesStore.set("token",token,{
        httpOnly:true,
        secure:true,
        maxAge:60*60*24 // 1 day
    })
    return "Cookie set successfully"
}