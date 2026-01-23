"use client"
import axios from "axios"


interface Data{
    todo:string,
    iscompleted:boolean
}

export const sendRequest = async(data:Data)=>{
    try{
         const response = await axios.post(
      "/api/create-todo",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    return response.data
    }catch(error){
        console.log("Error duringn sending request:",error)
    }
}