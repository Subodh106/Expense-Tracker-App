import connectdb from "@/db/connectDb"
import { getInfo } from "@/helpers/getinfo"
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";


export async function GET(req:Request) {
    try {
        await connectdb()
        const id = await getInfo();
        const isUserExist = await User.findById(id);
        if(!isUserExist){
            return Response.json({message:"Unauthorized access"},{status:401})
        }
        const groups = await Group.find({created_by:id});
        if(!groups){
            return Response.json({message:"Groups doesn't exist"},{status:409})
        }
        return Response.json({message:"Data of user successfully fetched",data:groups},{status:200})
    } catch (error:any) {
        console.log("Error during getting data:",error.message)
        return Response.json({message:"Error during getting data",error:error.message},{status:500})
    }
}