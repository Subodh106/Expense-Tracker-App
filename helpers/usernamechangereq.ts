"use client"

import axios from "axios"
export const usernamechangereq = async(userData:any):Promise<void>=>{
    try {
        const response = await axios.post("/api/user/update-username",userData,{
        headers: {
          "Content-Type": "application/json"
        }})

        const data = await response.data
        return data
    } catch (error:any) {
        console.log("Error during sending request:",error.message)
    }
}
