"use client"
import axios from "axios";

export async function deleteExpensereq() {
    try {
        const response = await axios.delete("/api/groups/69b130771dc3e6260dfecd9d/expenses/69b131691dc3e6260dfecda9");
        const data = await response.data;
        return data
    } catch (error:any) {
        return "Error during deleting expense request"
    }
}