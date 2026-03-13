import connectdb from "@/db/connectDb";
import { getInfo } from "@/helpers/getinfo";
import { User } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import { GroupInvite } from "@/models/GroupInvites.model";

export async function GET(req:NextRequest) {
    try {
        await connectdb();
        const id = await getInfo();
        if(!id){
            return NextResponse.json({message:"Unauthorized access"},{status:401});
        };
        if(!Types.ObjectId.isValid(id?.toString())){
            return NextResponse.json({messasge:"Invalid id formate"},{status:400});
        }
        const isUserExist = await User.findById(new Types.ObjectId(id));
        if(!isUserExist){
            return NextResponse.json({message:"User doesn't exist"},{status:404});
        }
        const isInviteExist = await GroupInvite.find({invitedUser_id:id});
        if(isInviteExist.length===0){
            return NextResponse.json({message:"Invites doesn't exist"},{status:404});
        }
        const pendingInvites = isInviteExist.filter((invites:any)=>invites.status=="pending");
        if(!pendingInvites){
            return NextResponse.json({message:"Pending invites doesn't exist"},{status:404})
        }
        return NextResponse.json({message:"Invites retrived successfully",data:pendingInvites},{status:200})
    } catch (error:any) {
        console.log("Error during getting invites:",error.message);
        return NextResponse.json({message:"Error during getting invites",error:error.message},{status:500});
    }
}