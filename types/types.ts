import { Document , Types } from "mongoose";

export interface UserType extends Document{
    username:string,
    email:string,
    password:string,
    groups:groups[]
}

export interface GroupType extends Document{
    group_name:string,
    created_by:Types.ObjectId,
    member:memberType[]
}

interface groups{
    group_id:Types.ObjectId,
    group_name:string
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

export interface dbConnection{
    isconnected?:number
}

export interface UserData{
    email:string,
    password:string,
}

export interface jwtPayload{
    id:string,
    email?:string
}

export interface GroupData{
    group_name:string
}

export interface ExpenseData{
    group_id:Number,
    split:splitType[],
    total_amount:Number,
    description:string
}

export interface GroupInvitesModelType extends Document{
    id:Types.ObjectId;
    group_id:Types.ObjectId;
    invitedUser_id:Types.ObjectId;
    invitedBy:Types.ObjectId;
    status:String;
}