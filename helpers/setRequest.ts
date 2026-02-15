"use client"
import { GroupData, UserData } from "@/types/types"
import axios from "axios"
export const sendRequest = async(userData:UserData):Promise<void>=>{
    try {
        const response = await axios.post("/api/user/log-in",userData,{
        headers: {
          "Content-Type": "application/json"
        }})

        const data = await response.data
        return data
    } catch (error:any) {
        console.log("Error during sending request:",error.message)
    }
}