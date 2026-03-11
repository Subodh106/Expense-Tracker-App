"use client"
import axios from "axios"
export const createExpenseReq = async(data:any):Promise<void>=>{
    try {
        const response = await axios.post("/api/groups/69b130771dc3e6260dfecd9d/expenses/create-expense",data,{
        headers: {
          "Content-Type": "application/json"
        }})
        const datas = await response.data
        return datas;
    } catch (error:any) {
        console.log("Error during sending request:",error.message)
    }
}
