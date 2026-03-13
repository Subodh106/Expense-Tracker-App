import connectdb from "@/db/connectDb";
import { getInfo } from "@/helpers/getinfo";
import mongoose, { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:Promise<{inviteId:string}>}) {
    try {
        await connectdb();
        const {inviteId} = await params;
        const id = await getInfo();
        if(!id){
            return NextResponse.json({message:"Unauthorized access"},{status:401});
        }
        if(!Types.ObjectId.isValid(id?.toString())){
            return NextResponse.json({message:"Invalid id formate"},{status:400});
        }
        if(!Types.ObjectId.isValid(inviteId?.toString())){
            return NextResponse.json({message:"Invalid id formate"},{status:400});
        }
    } catch (error:any) {
        console.log("Error during accepting the invites:",error.message);
        return NextResponse.json({message:"Error during accepting the invites",error:error.message},{status:500})
    }
}