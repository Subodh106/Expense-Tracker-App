import mongoose,{Schema} from "mongoose";
import { ExpenseType } from "@/types/types";

const ExpenseModel:Schema<ExpenseType> = new Schema({
    group_id:{
        type:mongoose.Types.ObjectId,
        ref:"Group"
    },
    split:[{
        user_id:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            required:true,
        },
        amount:{
            type:Number,
            required:true,
        }
    }],
    paid_by:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    total_amount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Expense = (mongoose.models.Expense as mongoose.Model<ExpenseType>)||(mongoose.model("Expense",ExpenseModel))