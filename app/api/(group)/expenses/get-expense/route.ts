import connectdb from "@/db/connectDb";
import { getInfo } from "@/helpers/getinfo";
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
import { Expense } from "@/models/Expense.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        await connectdb();
        const id = await getInfo();
        if(!id){
            return Response.json({message:"Unauthorized access"},{status:401})
        };
        if(!mongoose.Types.ObjectId.isValid(id)){
            return Response.json({message:"Invalid id formate"},{status:400})
        }
        const isUserExist = await User.findById(new mongoose.Types.ObjectId(id));
        if(!isUserExist){
            return Response.json({message:"User doesn't exist"},{status:404})
        };
        const {searchParams}= new URL(req.url);
        const queryParams = {
            group_id:searchParams.get("group_id")
        };
        const groupId:string = queryParams.group_id as string;
        if(!mongoose.Types.ObjectId.isValid(groupId)){
            return Response.json({message:"Invalid id formate"},{status:400})
        }
        const isGroupExist = await Group.findById(new mongoose.Types.ObjectId(groupId));
        if(!isGroupExist){
            return Response.json({message:"Group doesn't exist"},{status:404})
        };
        const isExpenseExist = await Expense.findById(new mongoose.Types.ObjectId())
        const isUserExistInGroup = isGroupExist.member.some((user:any)=>user.user_id===id);
        if(!isUserExistInGroup){
            return Response.json({message:"User doesn't exist in group"},{status:401})
        }
    } catch (error:any) {
        console.log("Error during retriving the expense:",error.message);
        return Response.json({message:"Errror during retriving the expense",error:error.message},{status:500})
    }
}