import connectdb from "@/db/connectDb"
import { getInfo } from "@/helpers/getinfo";
import { User } from "@/models/User.model";
import mongoose, { Types } from "mongoose";

export async function POST(request:Request) {
    try {
        await connectdb();
        const id= await getInfo() as string
        if(!mongoose.Types.ObjectId.isValid(id.toString())){
            return Response.json({message:"Invalid id formate"},{status:400})
        }
        const isUserExist = await User.findById(new Types.ObjectId(id?.toString()));
        if(!isUserExist){
            return Response.json({message:"User doesn't exist"},{status:404})
        }
        const{username} = await request.json();
        if(!username){
            return Response.json({message:"Something is missing"},{status:422})
        }
        const isUsernameUnique = await User.find({username:username});
        if(isUsernameUnique){
            return Response.json({message:"Username is not unique .Please try another one !"},{status:402})
        }
        const updatedUser = await User.findByIdAndUpdate(new Types.ObjectId(id?.toString()),{username:username});
        if(!updatedUser){
            return Response.json({message:"Internal Error"},{status:500})
        };
        return Response.json({message:"Username Updated successfully"},{status:201});
    } catch (error:any) {
        console.log("Error during updating user data:",error.message)
        return Response.json({message:"Error during updating user data",error:error.message},{status:500})
    }
}