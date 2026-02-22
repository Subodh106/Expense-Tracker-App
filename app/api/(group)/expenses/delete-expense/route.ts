import connectdb from "@/db/connectDb";
import { getInfo } from "@/helpers/getinfo";
import { Expense } from "@/models/Expense.model";
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
import { Types } from "mongoose";
import mongoose from "mongoose";

export async function DELETE(req: Request) {
    try {
        console.log()
        await connectdb()
        const id = await getInfo();
        if (!id) {
            return Response.json({ message: "Unauthorized access" }, { status: 401 })
        };
        const { searchParams } = new URL(req.url);
        const queryParams = {
            groupId: searchParams.get('groupId'),
            expenseId: searchParams.get('expenseId')
        }
        if(!mongoose.Types.ObjectId.isValid(id?.toString())){
            return Response.json({message:"Invalid id formate"},{status:400})
        }
        const isUserExist = await User.findById(new Types.ObjectId(id?.toString()))
        if(!isUserExist){
            return Response.json({message:"User doesn't exist"},{status:404})
        }
        const groupId = queryParams.groupId as string;
        const expenseId = queryParams.expenseId as string;
        if (!mongoose.Types.ObjectId.isValid(groupId && expenseId)) {
            return Response.json({ message: "Invalid id formate" }, { status: 400 })
        }
        const isGroupExist = await Group.findOne({ _id: new Types.ObjectId(groupId) })
        if (!isGroupExist) {
            return Response.json({ message: "Group doesn't exist" }, { status: 404 })
        }
        const isExpenseExist = await Expense.findOne({ _id: new Types.ObjectId(expenseId) });
        if (!isExpenseExist) {
            return Response.json({ mesage: "Expense doesn't exist" }, { status: 400 })
        }
        const isExpenseExistInGroup = isExpenseExist.group_id.toString() == isGroupExist._id.toString();
        if (!isExpenseExistInGroup) {
            return Response.json({ message: "Expense doesn't exist in that group" }, { status: 404 })
        }
        const isUserExistInGroupAndAuthorized = isGroupExist.member.some((user: any) => user.user_id == id && (user.roles === "admin" || user.roles === "creator"))
        if (!isUserExistInGroupAndAuthorized) {
            return Response.json({ message: "User is not permitted to delete group" }, { status: 403 })
        }
        const deltedExpense = await Expense.deleteOne({ _id: new Types.ObjectId(expenseId) });
        if (deltedExpense.acknowledged == false || deltedExpense.deletedCount === 0) {
            return Response.json({ message: "Internal error" }, { status: 500 })
        }
        return Response.json({ message: "Expense deleted successfully" }, { status: 201 })
    } catch (error: any) {
        console.log("Error during deleting expense:", error.message);
        return Response.json({ message: "Error during deleting expense", error: error.message }, { status: 500 })
    }
}