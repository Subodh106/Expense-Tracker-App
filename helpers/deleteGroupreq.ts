"use client"
import axios from "axios";

export async function deleteGroupreq() {
    try {
        const response = await axios.delete("/api/groups/69ae8848d11ab7532c99d83e");
        const data = await response.data;
        return data
    } catch (error:any) {
        return `Error durng deleting gorup :${error.message}`
    }
}