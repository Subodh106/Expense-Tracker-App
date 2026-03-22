import connectdb from "@/db/connectDb"
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
        console.log(isUserExist)
        if(!isUserExist){
            return NextResponse.json({message:"User doesn't exist"},{status:400})
        }
        
        const isUseringroups = await Group.find({"member.user_id":id});
        return NextResponse.json({message:"Data of user successfully fetched",data:{
            username:isUserExist.username,
            email:isUserExist.email,
            groups:isUseringroups,
        }},{status:200})
    } catch (error:any) {
        console.log("Error during getting data:",error.message)
        return NextResponse.json({message:"Error during getting data",error:error.message},{status:500})
    }
}