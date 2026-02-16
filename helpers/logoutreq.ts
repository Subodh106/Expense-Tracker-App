"use client"
import axios from "axios";

export async function logoutreq() {
    try {
        const response = await axios.delete("/api/user/log-out");
        const data = await response.data;
        return data
    } catch (error:any) {
        return "Error during loggin out request"
    }
}