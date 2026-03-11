import connectdb from "@/db/connectDb";
import { getInfo } from "@/helpers/getinfo";
import { Expense } from "@/models/Expense.model";
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
import { Types } from "mongoose";
import mongoose from "mongoose";
import { NextResponse , NextRequest } from "next/server";



// for retriving the expenses

export async function GET(req:NextRequest,{params}:{params:Promise<{groupId:string}>}) {
    try {
        await connectdb();
        const id = await getInfo();
        if(!id){
            return NextResponse.json({message:"Unauthorized access"},{status:401})
        };
        if(!mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({message:"Invalid id formate"},{status:400})
        }
        const isUserExist = await User.findById(new mongoose.Types.ObjectId(id));
        if(!isUserExist){
            return NextResponse.json({message:"User doesn't exist"},{status:404})
        };
        const{groupId}= await params;

        if(!mongoose.Types.ObjectId.isValid(groupId)){
            return NextResponse.json({message:"Invalid id formate"},{status:400})
        }
        const isGroupExist = await Group.findById(new mongoose.Types.ObjectId(groupId));
        if(!isGroupExist){
            return NextResponse.json({message:"Group doesn't exist"},{status:404})
        };
        const isExpenseExist = await Expense.findById(new mongoose.Types.ObjectId());
        if(!isExpenseExist){
            return NextResponse.json({message:"Expense doesn't exist"},{status:404})
        }
        const isUserExistInGroup = isGroupExist.member.some((user:any)=>user.user_id===id);
        if(!isUserExistInGroup){
            return NextResponse.json({message:"User doesn't exist in group"},{status:401})
        };
        const isExpenseExistInGroup = isExpenseExist.group_id === isGroupExist._id;
        if(!isExpenseExistInGroup){
            return NextResponse.json({message:"Expense doesn't exist in group"});
        };
        return NextResponse.json({message:"Expense retrived successfully",data:isExpenseExist},{status:200});
    } catch (error:any) {
        console.log("Error during retriving the expense:",error.message);
        return NextResponse.json({message:"Errror during retriving the expense",error:error.message},{status:500})
    }
}




// for deleting expense
export async function DELETE(req: NextRequest ,{params}:{params:Promise<{groupId:string,expenseId:string}>}) {
    try {
        await connectdb()
        const id = await getInfo();
        if (!id) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
        };
        const {groupId , expenseId} = await params;
        if(!mongoose.Types.ObjectId.isValid(id?.toString())){
            return NextResponse.json({message:"Invalid id formate"},{status:400})
        }
        const isUserExist = await User.findById(new Types.ObjectId(id?.toString()))
        if(!isUserExist){
            return NextResponse.json({message:"User doesn't exist"},{status:404})
        };
        if (!mongoose.Types.ObjectId.isValid(groupId && expenseId)) {
            return NextResponse.json({ message: "Invalid id formate" }, { status: 400 })
        }
        const isGroupExist = await Group.findOne({ _id: new Types.ObjectId(groupId) })
        if (!isGroupExist) {
            return NextResponse.json({ message: "Group doesn't exist" }, { status: 404 })
        }
        const isExpenseExist = await Expense.findOne({ _id: new Types.ObjectId(expenseId) });
        if (!isExpenseExist) {
            return NextResponse.json({ mesage: "Expense doesn't exist" }, { status: 400 })
        }
        const isExpenseExistInGroup = isExpenseExist.group_id.toString() == isGroupExist._id.toString();
        if (!isExpenseExistInGroup) {
            return NextResponse.json({ message: "Expense doesn't exist in that group" }, { status: 404 })
        }
        const isUserExistInGroupAndAuthorized = isGroupExist.member.some((user: any) => user.user_id == id && (user.roles === "admin" || user.roles === "creator"))
        if (!isUserExistInGroupAndAuthorized) {
            return NextResponse.json({ message: "User is not permitted to delete group" }, { status: 403 })
        }
        const deltedExpense = await Expense.deleteOne({ _id: new Types.ObjectId(expenseId) });
        if (deltedExpense.acknowledged == false || deltedExpense.deletedCount === 0) {
            return NextResponse.json({ message: "Internal error" }, { status: 500 })
        }
        return NextResponse.json({ message: "Expense deleted successfully" }, { status: 201 })
    } catch (error: any) {
        console.log("Error during deleting expense:", error.message);
        return NextResponse.json({ message: "Error during deleting expense", error: error.message }, { status: 500 })
    }
}