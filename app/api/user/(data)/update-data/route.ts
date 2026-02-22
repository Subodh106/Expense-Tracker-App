import connectdb from "@/db/connectDb"
import { getInfo } from "@/helpers/getinfo";
import { User } from "@/models/User.model";
import { Types } from "mongoose";

export async function POST(request:Request) {
    try {
        await connectdb();
        const id= await getInfo()
        const isUserExist = await User.findById(new Types.ObjectId(id?.toString()));
        if(!isUserExist){
            return Response.json({message:"User doesn't exist"},{status:404})
        }
    } catch (error:any) {
        console.log("Error during updating user data:",error.message)
        return Response.json({message:"Error during updating user data",error:error.message},{status:500})
    }
}