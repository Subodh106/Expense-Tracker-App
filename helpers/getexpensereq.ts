"use client"
import axios from "axios";

export async function getexpensereq() {
    try {
        const response = await axios.get("/api/expenses/get-expenses?groupId=698c540b738b7771f02d9c4f");
        const data = await response.data;
        return data
    } catch (error:any) {
        return "Error during loggin out request"
    }
}