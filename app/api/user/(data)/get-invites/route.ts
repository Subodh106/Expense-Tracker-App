import connectdb from "@/db/connectDb";
import { getInfo } from "@/helpers/getinfo";
import { User } from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import { GroupInvite } from "@/models/GroupInvites.model";
import { apiResponse } from "@/helpers/apiresponse";
import { ApiError } from "@/helpers/apiError";

export async function GET(req:NextRequest) {
    try {
        await connectdb();
        const id = await getInfo();
        if(!id){
            // return NextResponse.json({message:"Unauthorized access"},{status:401});?
            throw new ApiError(401,"Unauthorized access");
        };
        if(!Types.ObjectId.isValid(id?.toString())){
            // return NextResponse.json({messasge:"Invalid id formate"},{status:400});
            throw new ApiError(400,"Invalid id formate");
        }
        const isUserExist = await User.findById(new Types.ObjectId(id));
        if(!isUserExist){
            // return NextResponse.json({message:"User doesn't exist"},{status:404});
            throw new ApiError(404,"User doesn't exist");
        }
        const isInviteExist = await GroupInvite.find({invitedUser_id:id});
        if(isInviteExist.length===0){
            // return NextResponse.json({message:"Invites doesn't exist"},{status:404});
            throw new ApiError(404,"Invite doesn't exist");
        }
        const pendingInvites = isInviteExist.filter((invites:any)=>invites.status=="pending");
        if(!pendingInvites){
            // return NextResponse.json({message:"Pending invites doesn't exist"},{status:404})
            throw new ApiError(404,"Pending invites doens't exist")
        }
        // return NextResponse.json({message:"Invites retrived successfully",data:pendingInvites},{status:200})
        return new apiResponse(200,"Invites retrived successfully",{
            invites:pendingInvites
        })
    } catch (error:any) {
        console.log("Error during getting invites:",error.message);
        // return NextResponse.json({message:"Error during getting invites",error:error.message},{status:500});
        throw new ApiError(500,"Error during retriving invites",error.message);
    }
}