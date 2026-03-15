import { UserType } from "@/types/types";
import mongoose,{Schema} from "mongoose";

const UserModel:Schema<UserType> = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    groups:[
        {
        group_id:{
            type:mongoose.Types.ObjectId,
            ref:"Group" 
        },
        group_name:{
            type:String,
            require:true
        }
        }
    ]
},{timestamps:true})

export const User = (mongoose.models.User as mongoose.Model<UserType>)||(mongoose.model<UserType>("User",UserModel))