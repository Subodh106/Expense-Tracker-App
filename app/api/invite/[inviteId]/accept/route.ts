import connectdb from "@/db/connectDb";
import { ApiError } from "@/helpers/apiError";
import { apiResponse } from "@/helpers/apiresponse";
import { getInfo } from "@/helpers/getinfo";
import { Group } from "@/models/Group.model";
import { GroupInvite } from "@/models/GroupInvites.model";
import { User } from "@/models/User.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{params}:{params:Promise<{inviteId:string}>}) {
    try {
        await connectdb();
        const { inviteId } = await params;
        const id = await getInfo();
        if(!id){
            throw new ApiError(401,"Unauthorized access");
        }
        if(!Types.ObjectId.isValid(id?.toString())){
            throw new ApiError(400,"Invalid id formate");
        }
        const isUserExist = await User.findById(new Types.ObjectId(id?.toString()));
        if(!isUserExist){
            throw new ApiError(404,"User doesn't exist");
        }
        if(!Types.ObjectId.isValid(inviteId?.toString())){
            throw new ApiError(400,"Invalid id formate");
        };
        const isInviteExist = await GroupInvite.findById(new Types.ObjectId(inviteId?.toString()));
        if(!isInviteExist){
            throw new ApiError(404,"Invite doesn't exist");
        }
        if(!Types.ObjectId.isValid(isInviteExist.group_id?.toString())){
            throw new ApiError(400,"Invalid id formate");
        }
        const isUserAllowedToAccept = isInviteExist.invitedUser_id?.toString()===id;
        if(!isUserAllowedToAccept){
            throw new ApiError(401,"User isn't allowed to accept the invite");
        }
        const isGroupExist = await Group.findById(new Types.ObjectId(isInviteExist.group_id?.toString()));
        if(!isGroupExist){
            throw new ApiError(404,"Group doesn't exist");
        }
        const invitedUser_id = isInviteExist.invitedUser_id?.toString();
        if(! Types.ObjectId.isValid(invitedUser_id)){
            throw new ApiError(400,"Invalid id formate");
        }
        const isInvitedUserExist = await User.findById(new Types.ObjectId(invitedUser_id));
        if(!isInvitedUserExist){
            throw new ApiError(404,"Invited user doesn't exist");
        }
        const isInvitedUserAlreadyInThisGroup = isGroupExist.member.some((user:any)=> user.user_id?.toString()===isInvitedUserExist._id?.toString());
        if(isInvitedUserAlreadyInThisGroup){
            throw new ApiError(409,"Invited user already is in group");
        }

        // updating group array
        isGroupExist.member.push({user_id:new Types.ObjectId(invitedUser_id?.toString()),roles:"member"});
        isGroupExist.save();

        // updating user's group array
        isInvitedUserExist.groups.push({group_id:isGroupExist._id,group_name:isGroupExist.group_name});
        isInvitedUserExist.save();

        // updating group invite status
        isInviteExist.status="accepted";
        isInviteExist.save();
        return new apiResponse(200,"Invite accepted successfully");
    } catch (error:any) {
        console.log("Error during accepting the invites:",error.message);
        throw new ApiError(500,"Error during accepting the invite",error.message);
    }
}