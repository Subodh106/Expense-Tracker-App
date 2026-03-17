"use client"
import axios from "axios";

export async function sendInvites(data:any) {
    try {
        console.log(data)
        const response = await axios.post("/api/groups/69b6e5fbc46d85351507d3cd/invites",data,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        const result = await response.data;
        return result;
    } catch (error:any) {
        return "Error during sending invite request"
    }
}


export async function acceptInvites() {
    try {
        const response = await axios.put("/api/invite/69b98f8ce7f93ae701ede17c/accept");
        const result = await response.data;
        return result;
    } catch (error:any) {
        return "Error during accepting invite request"
    }
}


export async function rejectInvites() {
    try {
        const response = await axios.patch("/api/invite/69b987bbe7f93ae701ede14d/reject");
        const result = await response.data;
        return result;
    } catch (error:any) {
        return "Error during rejecting invite request"
    }
}