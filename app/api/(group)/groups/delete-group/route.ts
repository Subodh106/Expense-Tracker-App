import connectdb from "@/db/connectDb";
import { getInfo } from "@/helpers/getinfo";
export async function DELETE(req:Request) {
    try {
        await connectdb()
        const id = getInfo();
        
    } catch (error:any) {
        console.log("Error during deleting group:",error.message);
        return Response.json({message:"Error during deleting group",error:error.message},{status:500})
    }
}