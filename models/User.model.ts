import { UserType } from "@/types/types";
import mongoose,{Schema} from "mongoose";

const UserModel:Schema<UserType> = new Schema({
    username:{
        type:String,
        required:true,
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
            type:mongoose.Types.ObjectId,
            ref:"Group"
        }
    ]
},{timestamps:true})

export const user = (mongoose.models.User as mongoose.Model<UserType>)||(mongoose.model<UserType>("User",UserModel))