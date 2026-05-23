import connectdb from "@/db/connectDb"
import { ApiError } from "@/helpers/apiError";
import { apiResponse } from "@/helpers/apiresponse";
import { getInfo } from "@/helpers/getinfo";
import { User } from "@/models/User.model";
import mongoose, { Types } from "mongoose";
import { NextResponse , NextRequest } from "next/server";

export async function POST(request:NextRequest) {
    try {
        await connectdb();
        const id= await getInfo() as string
        if(!mongoose.Types.ObjectId.isValid(id.toString())){
            // return NextResponse.json({message:"Invalid id formate"},{status:400});?
            throw new ApiError(400,"Invalid id formate");
        }
        const isUserExist = await User.findById(new Types.ObjectId(id?.toString()));
        if(!isUserExist){
            // return NextResponse.json({message:"User doesn't exist"},{status:404})
            throw new ApiError(404,"User doesn't exist");
        }
        const {searchParams} = new  URL(request.url);
        const username = searchParams.get("username")
        if(!username){
            return NextResponse.json({message:"Something is missing"},{status:422})
        }
        const isUsernameUnique = await User.find({username:username});
        if(isUsernameUnique){
            return NextResponse.json({message:"Username is not unique .Please try another one !"},{status:402})
        }
        const updatedUser = await User.findByIdAndUpdate(new Types.ObjectId(id?.toString()),{username:username});
        if(!updatedUser){
            return NextResponse.json({message:"Internal Error"},{status:500})
        };
        return new apiResponse(200,"Username changed successfully")
    } catch (error:any) {
        console.log("Error during updating user data:",error.message)
        return NextResponse.json({message:"Error during updating user data",error:error.message},{status:500})
    }
}