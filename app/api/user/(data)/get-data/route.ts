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
            // return NextResponse.json({message:"Something is missing"},{status:402})
            throw new ApiError(402,"Something is missing");
        }
        if(!mongoose.Types.ObjectId.isValid(userId)){
            // return NextResponse.json({message:"Invalid format"},{status:400})
            throw new ApiError(400,"Invalid Id formate");
        }
        const isUserExist = await User.findById(new Types.ObjectId(userId))
        if(!isUserExist){
            // return NextResponse.json({message:"User doesn't exist"},{status:400})
            throw new ApiError(409,"User doesn't exist");
        }
        const groups = await Group.findById({"member.user_id":userId});
        if(!groups){
            // return NextResponse.json({message:"Groups doesn't exist"},{status:409})?
            throw new ApiError(409,"Group doesn't exist");
        }
        return new apiResponse(200,"Data of user successfully retrived",{
            username:isUserExist.username,
            email:isUserExist.email,
            groups:isUserExist.groups
        })

    } catch (error:any) {
        console.log("Error during getting data:",error.message)
        // return NextResponse.json({message:"Error during getting data",error:error.message},{status:500})
        throw new ApiError(500,"Error during retriving data",error.message);
    }
}