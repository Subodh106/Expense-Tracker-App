import connectdb from "@/db/connectDb"
import { ApiError } from "@/helpers/apiError";
import { apiResponse } from "@/helpers/apiresponse";
import { getInfo } from "@/helpers/getinfo"
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
import {Types} from "mongoose";
import { NextResponse} from "next/server";

export async function GET() {
    try {
        await connectdb()
        const id = await getInfo() as string;
        if(!Types.ObjectId.isValid(id?.toString())){
            throw new ApiError(400,"Invalid id formate");
        }
        const isUserauthorized = await User.findById( new Types.ObjectId(id));
        if(!isUserauthorized){
            throw new ApiError(401,"Unauthorized access");
        }      
        const isUserExist = await User.findById(new Types.ObjectId(id))
        if(!isUserExist){
            throw new ApiError(404,"Error doesn't exist");
        }
        return new apiResponse(200,"Data of user retrived successfully",{
            username:isUserExist.username,
            email:isUserExist.email,
            groups:isUserExist.groups
        })
    } catch (error:any) {
        console.log("Error during getting data:",error.message)
        throw new ApiError(500,"Error during retriving data ");
    }
}