import connectdb from "@/db/connectDb"
import { ApiError } from "@/helpers/apiError";
import { apiResponse } from "@/helpers/apiresponse";
import { getInfo } from "@/helpers/getinfo"
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
import mongoose ,{Types} from "mongoose";
import { NextResponse , NextRequest } from "next/server";

export async function GET(req:NextRequest) {
    try {
        await connectdb()
        const id = await getInfo();
        const isUserauthorized = await User.findById(id);
        if(!isUserauthorized){
            throw new ApiError(401,"Unauthorized access");
        }      
        const userId = await req.json()
        if(!userId){
            throw new ApiError(402,"Something is missing");
        }
        if(!mongoose.Types.ObjectId.isValid(userId)){
            throw new ApiError(400,"Invalid Id formate");
        }
        const isUserExist = await User.findById(new Types.ObjectId(userId))
        if(!isUserExist){
            throw new ApiError(409,"User doesn't exist");
        }
        const groups = await Group.findById({"member.user_id":userId});
        if(!groups){
            throw new ApiError(409,"Group doesn't exist");
        }
        return new apiResponse(200,"Data of user successfully retrived",{
            username:isUserExist.username,
            email:isUserExist.email,
            groups:isUserExist.groups
        })

    } catch (error:any) {
        console.log("Error during getting data:",error.message)
        throw new ApiError(500,"Error during retriving data",error.message);
    }
}