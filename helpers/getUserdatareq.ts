"use client"
import axios from "axios";

export async function getUserDatareq() {
    try {
        const response = await axios.get("/api/user/get-data");
        const data = await response.data;
        return data
    } catch (error:any) {
        return "Error during loggin out request"
    }
}