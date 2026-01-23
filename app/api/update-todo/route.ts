import { connectDb } from "@/db/connectDb";

export async function POST(req:Request) {
    connectDb()
    try {
        
    } catch (error:any) {
        console.log("Error during updating todo",error.message)
        return Response.json({message:"Error during updating todo",error:error.message},{status:500})
        
    }
}