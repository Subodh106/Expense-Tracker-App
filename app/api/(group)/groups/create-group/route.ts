import connectdb from "@/db/connectDb";
import { getInfo } from "@/helpers/getinfo";
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
import mongoose, { MongooseError, Types } from "mongoose";
export async function POST(req:Request) {
    try {
        await connectdb();
        const id = await getInfo()
        if(!id){
            return Response.json({message:"Unauthorized access"},{status:401})
        }
        if(!mongoose.Types.ObjectId.isValid(id.toString())){
            return Response.json({message:"Invalid id formate"},{status:400})
        }

        const {group_name}= await req.json();
        const isUserExist = await User.findById(new Types.ObjectId(id?.toString()));
        if(!isUserExist){
            return Response.json({message:"User doesn't exist"},{status:404})
        };
        const isGroupExistWithUser = await Group.find({
            group_name:group_name,
            created_by: new mongoose.Types.ObjectId(id)
        })
        if(isGroupExistWithUser){
            return Response.json({message:"User already have group with this name. Please try other name!"},{status:401})
        }
        const createdGroup = await Group.create({
            group_name:group_name,created_by:id,member:[{user_id:id,roles:"creator"}]
        })
        return Response.json({message:"Group created successfully",data:createdGroup},{status:201})
    } catch (error:any) {
        console.log("Error during creating group:",error.message);
        return Response.json({message:"Error durign creating group",error:error.message},{status:500})
    }
}