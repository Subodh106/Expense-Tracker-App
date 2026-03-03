"use client"
import axios from "axios";
// TODO: add id of user whose data you want to retrive in this this 
export async function getUserDatareq() {
    try {
        const response = await axios.get("/api/user/get-data");
        const data = await response.data;
        return data
    } catch (error:any) {
        return `Error during retriving data request: ${error.message}`
    }
}