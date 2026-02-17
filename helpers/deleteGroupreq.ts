"use client"
import axios from "axios";

export async function deleteGroupreq() {
    try {
        const response = await axios.delete("/api/groups/delete-group?groupId=6994341724c69a154a90b094");
        const data = await response.data;
        return data
    } catch (error:any) {
        return "Error during loggin out request"
    }
}