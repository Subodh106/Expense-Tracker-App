import connectdb from "@/db/connectDb";
import { getInfo } from "@/helpers/getinfo";
import mongoose, { Types } from "mongoose";
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
export async function DELETE(req:Request) {
    try {
        await connectdb()
        const id = await getInfo();
        const{searchParams} = new URL(req.url);
        const queryParams = {
            groupId:searchParams.get('groupId')
        };
        if(!id){
            return Response.json({message:"Unauthorized access"},{status:401});
        }
        if(!mongoose.Types.ObjectId.isValid(id)){
            return Response.json({message:"Invalid id formate"},{status:400})
        }
        const isUserExist = await User.findById(new Types.ObjectId(id?.toString()));
        if(!isUserExist){
            return Response.json({message:"User doesn't exist"},{status:404})
        }
        const groupId = queryParams.groupId as string;
        if(!groupId){
            return Response.json({message:"Something is missing"
            },{status:422})
        };
        if(!mongoose.Types.ObjectId.isValid(groupId)){
            return Response.json({message:"Invalid id formate"},{status:400})
        }
        const isGroupExist = await Group.findById(new Types.ObjectId(groupId));
        if(!isGroupExist){
            return Response.json({message:"Group doesn't exist"},{status:404})
        }
        const isUserInGroupAndAuthorized = isGroupExist.member.some((user:any)=>user.user_id.toString()===id&&(user.roles ==="admin"||user.roles==="creator"));
        console.log(isUserInGroupAndAuthorized)
        if(!isUserInGroupAndAuthorized){
            return Response.json({message:"User is not permitted to change group"},{status:403})
        };
        const deltedGroup =await Group.deleteOne({_id:groupId });
        if(deltedGroup.acknowledged==false||deltedGroup.deletedCount===0){
            return Response.json({message:"Internal error"},{status:500
            })
        }
        return Response.json({message:"Group is deleted successfully"},{status:201})
    } catch (error:any) {
        console.log("Error during deleting group:",error.message);
        return Response.json({message:"Error during deleting group",error:error.message},{status:500})
    }
}