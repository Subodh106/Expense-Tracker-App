import mongoose, { modelNames, Schema } from "mongoose";

interface todo {
    todo:string,
    iscompleted:boolean
    createdAt:Date
}

const TodoSchmea:Schema<todo> = new mongoose.Schema({
    todo:{
        type:String,
        required:true
    },
    iscompleted:{
        type:Boolean,
        required:true,
        default:false
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
},{timestamps:true})

export const todoModel = (mongoose.models.Todo as mongoose.Model<todo>)||(mongoose.model("Todo",TodoSchmea))