import connectdb from "@/db/connectDb";
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
            return NextResponse.json({message:"Unauthorized access"},{status:401});
        }
        if(!Types.ObjectId.isValid(id?.toString())){
            return NextResponse.json({message:"Invalid id formate"},{status:400});
        }
        const isUserExist = await User.findById(new Types.ObjectId(id?.toString()));
        if(!isUserExist){
            return NextResponse.json({message:"User doesn't exist"},{status:404})
        }
        if(!Types.ObjectId.isValid(inviteId?.toString())){
            return NextResponse.json({message:"Invalid id formate"},{status:400});
        };
        const isInviteExist = await GroupInvite.findById(new Types.ObjectId(inviteId?.toString()));
        if(!isInviteExist){
            return NextResponse.json({message:"Invite doens't exsit"},{status:404});
        }
        if(!Types.ObjectId.isValid(isInviteExist.group_id?.toString())){
            return NextResponse.json({message:"Invalid id formate"},{status:400});
        }
        const isUserAllowedToAccept = isInviteExist.invitedUser_id?.toString()===id;
        if(!isUserAllowedToAccept){
            return NextResponse.json({message:"User isn't allowed to accept the invite"},{status:401});
        }
        const isGroupExist = await Group.findById(new Types.ObjectId(isInviteExist.group_id?.toString()));
        if(!isGroupExist){
            return NextResponse.json({message:"Group doesn't exist"},{status:404});
        }
        // validate the invitedUser_id and add that id in group
        const invitedUser_id = isInviteExist.invitedUser_id?.toString();
        if(! Types.ObjectId.isValid(invitedUser_id)){
            return NextResponse.json({message:"Invalid id formate"},{status:400})
        }
        const isInvitedUserExist = await User.findById(new Types.ObjectId(invitedUser_id));
        if(!isInvitedUserExist){
            return NextResponse.json({message:"Invited User doesn't exist"},{status:404})
        }
        const isInvitedUserAlreadyInThisGroup = isGroupExist.member.some((user:any)=> user.user_id?.toString()===isInvitedUserExist._id?.toString());
        if(isInvitedUserAlreadyInThisGroup){
            return NextResponse.json({message:"Invited user already is in group"},{status:409})
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
        return NextResponse.json({message:"Accepted the request successfully"},{status:200});
    } catch (error:any) {
        console.log("Error during accepting the invites:",error.message);
        return NextResponse.json({message:"Error during accepting the invites",error:error.message},{status:500});
    }
}