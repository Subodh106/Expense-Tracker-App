"use client"
import axios from "axios";

export async function deleteExpensereq() {
    try {
        const response = await axios.delete("/api/expenses/delete-expense?groupId=699519ee0b7028e458c40bb7&expenseId=699acf2e450e2ff22327dc26");
        const data = await response.data;
        return data
    } catch (error:any) {
        return "Error during deleting expense request"
    }
}