import mongoose from "mongoose";

interface connection{
    isconnected?:number
}

const isConnection:connection ={}

export async function connectDb():Promise<void> {
    if(isConnection.isconnected){
        console.log("DataBase is already connected")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI||"");
        console.log(db)
        isConnection.isconnected=db.connection.readyState
    } catch (error) {
        console.log("Error during Db connect",error)
        process.exit(1)
    }
}