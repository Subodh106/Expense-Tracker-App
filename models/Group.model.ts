import { GroupType } from "@/types/types";
import { Schema } from "mongoose";
import mongoose  from "mongoose";

const GroupModel:Schema<GroupType> = new Schema({
    group_name:{
        type:String,
        required:true,
    },
    created_by:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    member:[{
        user_id:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            required:true,
        },
        role:{
            type:String,
            required:true,
            enum:["admin","creator","member"],
            default:"member"
        }
    }]
},{timestamps:true})

export const Group = (mongoose.models.Group as mongoose.Model<GroupType>)||(mongoose.model<GroupType>("Group",GroupModel))