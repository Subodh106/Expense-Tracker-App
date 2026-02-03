"use client"
import { UserData } from "@/types/types"
import axios from "axios"
export const sendRequest = async(data:UserData):Promise<void>=>{
    try {
        console.log(data)
        const response = await axios.post("/api/log-in",data,{
        headers: {
          "Content-Type": "application/json"
        }})

        const datas = await response.data
        return datas
    } catch (error:any) {
        console.log("Error during sending request:",error.message)
    }
}