import connectdb from "@/db/connectDb"
import { getInfo } from "@/helpers/getinfo"
import { Expense } from "@/models/Expense.model"
import { Group } from "@/models/Group.model"
import mongoose, { Types } from "mongoose"


export async function GET(req:Request) {
    try {
        await connectdb()
        const {searchParams}= new URL(req.url)
        const queryParams ={
            groupId:searchParams.get('groupId')
        }
        const id = await getInfo();
        console.log(id)
        if(!id){
            return Response.json({message:"Unauthorized access"},{status:401})
        }
        const groupId = queryParams.groupId as string;
        if(!mongoose.Types.ObjectId.isValid(groupId)){
            return Response.json({message:"Invalid id formate"},{status:400})
        }
        const isGroupExit = await Group.findById(new Types.ObjectId(groupId))
        if(!isGroupExit){
            return Response.json({message:"Group doesn't exist"},{status:403})
        };
        const isExpenseExist = await Expense.find({group_id:groupId});
        if(isExpenseExist.length===0){
            return Response.json({message:"Expense doesn't exist"},{status:401})
        };

        return Response.json({message:"Expense retrived successfully",data:isExpenseExist},{status:200})
    } catch (error:any) {
        console.log("Error during getting expenses",error.message)
        return Response.json({message:"Error during getting expenses",error:error.message},{status:500})
    }
}