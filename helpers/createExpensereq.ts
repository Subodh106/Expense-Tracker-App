"use client"
import { GroupData,} from "@/types/types"
import axios from "axios"
export const createExpenseReq = async(data:any):Promise<void>=>{
    try {
        console.log('adfa')
        console.log(data)
        const response = await axios.post("/api/expenses/create-expense",data,{
        headers: {
          "Content-Type": "application/json"
        }})
        console.log("dafa")
        const datas = await response.data
        return datas;
    } catch (error:any) {
        console.log("Error during sending request:",error.message)
    }
}
