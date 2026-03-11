import { GroupInvitesModelType } from "@/types/types";
import mongoose, { mongo, Schema } from "mongoose";

const GroupInvitesModel:Schema<GroupInvitesModelType> = new mongoose.Schema({
     id:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
     },
    group_id:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
     },
    invitedUser_id:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
     },   
    invitedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
     },
     status:{
        type:String,
        required:true,
        enum:["pending","accepted","rejected"]
     }
},{timestamps:true})

export const GroupInvite = (mongoose.models.GroupInvite as mongoose.Model<GroupInvitesModelType>)||(mongoose.model<GroupInvitesModelType>("GroupInvite",GroupInvitesModel));