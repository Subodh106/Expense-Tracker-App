import { getCookie } from "@/lib/auth";
import { decodeJwt } from "./DecodeJwt";
export  async function getInfo() {
    try {
        const cookie = await getCookie();
        if(!cookie){
            return 
        }
        const token = cookie?.toString()
        console.log(token)
        const id = decodeJwt(token)
        return id.toString()
    } catch (error:any) {
        console.log("Error druing retriving info:",error.message)
    }
}