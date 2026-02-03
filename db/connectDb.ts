import mongoose from "mongoose";
import { dbConnection } from "@/types/types";

let DbConnection:dbConnection ={
    isconnected:undefined
}
const connectdb = async():Promise<void>=>{
    if(DbConnection.isconnected==1){
        console.log("Db is already connected")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI||"");
        DbConnection.isconnected=db.ConnectionStates.connected
        console.log("Db connected successfully for the first time")
    } catch (error:any) {
        console.log("Error during connecting database",error.message)
        process.exit(1)
    }
}

export default connectdb