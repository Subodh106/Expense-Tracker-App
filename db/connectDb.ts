import mongoose from "mongoose";
import { dbConnection } from "@/types/types";

const DbConnection:dbConnection ={
    isconnected:undefined
}
const connectdb = async():Promise<void>=>{
    if(DbConnection.isconnected){
        console.log("Db is already connected")
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI||"");
        console.log(db)
        DbConnection.isconnected = db.connection.readyState
        console.log("Db connected successfully for the first time")
    } catch (error:any) {
        console.log("Error during connecting database",error.message)
    }
}