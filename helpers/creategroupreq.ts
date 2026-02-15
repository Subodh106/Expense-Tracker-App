"use client"
import { GroupData, UserData } from "@/types/types"
import axios from "axios"
export const creategroupReq = async(data:GroupData):Promise<void>=>{
    try {
        const response = await axios.post("/api/groups/create-group",data,{
        headers: {
          "Content-Type": "application/json"
        }})
        const datas = await response.data
        return datas
    } catch (error:any) {
        console.log("Error during sending request:",error.message)
    }
}