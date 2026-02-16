import connectdb from "@/db/connectDb"
import { getInfo } from "@/helpers/getinfo"
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
import mongoose ,{Types} from "mongoose";

export async function GET(req:Request) {
    try {
        await connectdb()
        const id = await getInfo();
        const isUserauthorized = await User.findById(id);
        if(!isUserauthorized){
            return Response.json({message:"Unauthorized access"},{status:401})
        }
        const userId = await req.json()
        if(!userId){
            return Response.json({message:"Something is missing"},{status:402})
        }
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return Response.json({message:"Invalid format"},{status:400})
        }
        const isUserExist = await User.findById(new Types.ObjectId(userId))
        if(!isUserExist){
            return Response.json({message:"User doesn't exist"},{status:400})
        }
        const groups = await Group.findById({"member.user_id":userId});
        if(!groups){
            return Response.json({message:"Groups doesn't exist"},{status:409})
        }
        return Response.json({message:"Data of user successfully fetched",data:{
            username:isUserExist.username,
            email:isUserExist.email,
            groups:groups,
        }},{status:200})
    } catch (error:any) {
        console.log("Error during getting data:",error.message)
        return Response.json({message:"Error during getting data",error:error.message},{status:500})
    }
}