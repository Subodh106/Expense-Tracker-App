import connectdb from "@/db/connectDb"
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
            return NextResponse.json({message:"Invalid id formate"},{status:400})
        }
        const isUserauthorized = await User.findById( new Types.ObjectId(id));
        if(!isUserauthorized){
            return NextResponse.json({message:"Unauthorized access"},{status:401})
        }      
        const isUserExist = await User.findById(new Types.ObjectId(id))
        if(!isUserExist){
            return NextResponse.json({message:"User doesn't exist"},{status:400})
        }
        
        const isUseringroups = await Group.find({"member.user_id":id});
        
        return new apiResponse(true,200,"Data of user retrived successfully",{
            username:isUserExist.username,
            email:isUserExist.email,
            groups:isUserExist.groups
        })
    } catch (error:any) {
        console.log("Error during getting data:",error.message)
        return NextResponse.json({message:"Error during getting data",error:error.message},{status:500})
    }
}