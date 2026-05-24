import connectdb from "@/db/connectDb";
import { ApiError } from "@/helpers/apiError";
import { apiResponse } from "@/helpers/apiresponse";
import { getInfo } from "@/helpers/getinfo";
import { Group } from "@/models/Group.model";
import { GroupInvite } from "@/models/GroupInvites.model";
import { User } from "@/models/User.model";
import { Types } from "mongoose";
import { NextRequest} from "next/server";

export async function PATCH(req:NextRequest,{params}:{params:Promise<{inviteId:string}>}) {
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
            throw new ApiError(401,"User isn't allowed to accept the invites")
        }
        const isGroupExist = await Group.findById(new Types.ObjectId(isInviteExist.group_id?.toString()));
        if(!isGroupExist){
            throw new ApiError(404,"Group doesn't exist");
        }
        const isInviteAlreadyAccepted = isInviteExist.status=="accepted";
        if(isInviteAlreadyAccepted){
            throw new ApiError(409,"Invite is already accepted");
        }
        isInviteExist.status="rejected";
        isInviteExist.save();
        return new apiResponse(200,"Invited rejected successfully");
    } catch (error:any) {
        console.log("Error during accepting the invites:",error.message);
        throw new ApiError(500,"Error during rejecting the invites",error.message);
    }
}