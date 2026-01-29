import { Document , Types } from "mongoose";

export interface UserType extends Document{
    username:string,
    email:string,
    password:string,
    groups:Types.ObjectId[]
}

export interface GroupType extends Document{
    group_name:string,
    created_by:Types.ObjectId,
    member:memberType[]
}

export interface ExpenseType extends Document{
    group_id:Types.ObjectId,
    paid_by:Types.ObjectId,
    total_amount:number,
    description:string
    split:splitType[],
    
}

export interface memberType{
    user_id:Types.ObjectId
    roles:"admin"|"creator"|"member"
}

export interface splitType {
    user_id:Types.ObjectId,
    amount:number
}