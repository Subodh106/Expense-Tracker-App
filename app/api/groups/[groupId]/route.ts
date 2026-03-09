import connectdb from "@/db/connectDb";
import { getInfo } from "@/helpers/getinfo";
import mongoose, { Types } from "mongoose";
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
import { Expense } from "@/models/Expense.model";
import { NextResponse} from "next/server";


// for deleting group
export async function DELETE( _:any,{params}:{params:Promise<{groupId:string}>}) {
    try {
        await connectdb()
        console.log('asf')
        const id = await getInfo();
        const { groupId } = await params;
        if(!groupId){
            return NextResponse.json({message:"Group Id is missing"},{status:403})
        }
        if(!id){
            return NextResponse.json({message:"Unauthorized access"},{status:401});
        }
        if(!mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({message:"Invalid id formate"},{status:400})
        }
        const isUserExist = await User.findById(new Types.ObjectId(id?.toString()));
        if(!isUserExist){
            return NextResponse.json({message:"User doesn't exist"},{status:404})
        }
        if(!groupId){
            return NextResponse.json({message:"Something is missing"
            },{status:422})
        };
        if(!mongoose.Types.ObjectId.isValid(groupId)){
            return NextResponse.json({message:"Invalid id formate"},{status:400})
        }
        const isGroupExist = await Group.findById(new Types.ObjectId(groupId));
        if(!isGroupExist){
            return NextResponse.json({message:"Group doesn't exist"},{status:404})
        }
        const isUserInGroupAndAuthorized = isGroupExist.member.some(
            (user:any)=>user.user_id.toString()===id.toString() &&
            (user.roles ==="admin"||user.roles==="creator"));
        console.log(isUserInGroupAndAuthorized)
        if(!isUserInGroupAndAuthorized){
            return NextResponse.json({message:"User is not permitted to change group"},{status:403})
        };
        const deltedGroup =await Group.deleteOne({_id:groupId });
        if(deltedGroup.acknowledged==false||deltedGroup.deletedCount===0){
            return NextResponse.json({message:"Internal error"},{status:500
            })
        }
        return NextResponse.json({message:"Group is deleted successfully"},{status:201})
    } catch (error:any) {
        console.log("Error during deleting group:",error.message);
        return NextResponse.json({message:"Error during deleting group",error:error.message},{status:500})
    }
}


// for getting the data of group

export async function GET(_:any,{params}:{params:Promise<{groupId:string}>}) {
    try {
        await connectdb()
        const {groupId} = await params;
        const id = await getInfo();
        if(!id){
            return NextResponse.json({message:"Unauthorized access"},{status:401})
        }
        if(!mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({message:"Invalid id formate"},{status:400})
        }
        const isUserExist = await User.findById(new Types.ObjectId(id?.toString()))
        if(!isUserExist){
            return NextResponse.json({message:"User doesn't exist"},{status:404})
        }
        if(!mongoose.Types.ObjectId.isValid(groupId)){
            return NextResponse.json({message:"Invalid id formate"},{status:400})
        }
        const isGroupExit = await Group.findById(new Types.ObjectId(groupId))
        if(!isGroupExit){
            return NextResponse.json({message:"Group doesn't exist"},{status:403})
        };
        const isExpenseExist = await Expense.find({group_id:groupId});
        if(isExpenseExist.length===0){
            return NextResponse.json({message:"Expense doesn't exist"},{status:401})
        };
        return NextResponse.json({message:"Expense retrived successfully",data:{
            groupId:isGroupExit._id,
            group_name:isGroupExit.group_name,
            member:isGroupExit.member,
            expenses:isExpenseExist
        }},{status:200})
    } catch (error:any) {
        console.log("Error during getting expenses",error.message)
        return NextResponse.json({message:"Error during getting expenses",error:error.message},{status:500})
    }
}