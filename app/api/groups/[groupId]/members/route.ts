import connectdb from "@/db/connectDb";
import { getInfo } from "@/helpers/getinfo";
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:Promise<{groupId:string}>}) {
    try {
        await connectdb();
        const id = getInfo();
        if(!id){
            return NextResponse.json({message:"Unauthorized access"},{status:401});
        };
        if(!Types.ObjectId.isValid(id?.toString())){
            return NextResponse.json({message:"Invalid id formate"},{status:400})
        }
        const isUserExist = await User.findById(new Types.ObjectId(id?.toString()));
        if(!isUserExist){
            return NextResponse.json({message:"User doesn't exist"},{status:404})
        }
        const {groupId} = await params;
        if(!Types.ObjectId.isValid(groupId.toString())){
            return NextResponse.json({message:"Invalid Id formate"},{status:400});
        };
        const isGroupExist = await Group.findById(new Types.ObjectId(groupId?.toString()));
        if(!isGroupExist){
            return NextResponse.json({message:"Group doesn't exist"},{status:404})
        }
        const isUserExistInGroup = isGroupExist.member.some((user:any)=>user.user_id===id);
        if(!isUserExistInGroup){
            return Response.json({message:"Unauthorized access"},{status:401})
        }
    } catch (error:any) {
        console.log("Error during adding members is group",error.message);
        return NextResponse.json({message:"Error during adding members"},{status:500})
    }
}