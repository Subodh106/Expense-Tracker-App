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
            throw new ApiError(401,"Unauthorized access");
        };
        if(!Types.ObjectId.isValid(id?.toString())){
            throw new ApiError(400,"Invalid id formate");
        }
        const isUserExist = await User.findById(new Types.ObjectId(id));
        if(!isUserExist){
            throw new ApiError(404,"User doesn't exist");
        }
        const isInviteExist = await GroupInvite.find({invitedUser_id:id});
        if(isInviteExist.length===0){
            throw new ApiError(404,"Invite doesn't exist");
        }
        const pendingInvites = isInviteExist.filter((invites:any)=>invites.status=="pending");
        if(!pendingInvites){
            throw new ApiError(404,"Pending invites doens't exist")
        }
        return new apiResponse(200,"Invites retrived successfully",{
            invites:pendingInvites
        })
    } catch (error:any) {
        console.log("Error during getting invites:",error.message);
        throw new ApiError(500,"Error during retriving invites",error.message);
    }
}