"use client"
import axios from "axios";

export async function getuser() {
    try {
        const res = await axios.get("/api/user/get-me");

        return {
            success: true,
            user: res.data
        };

    } catch (error: any) {
        console.log("getUser error:", error?.response?.status);

        return {
            success: false,
            user: null,
            error:error?.response?.data?.message
        };
    }
}