import connectdb from "@/db/connectDb";
import { getInfo } from "@/helpers/getinfo";
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
export async function GET(req:Request) {
    try {
        await connectdb();
        const id = await getInfo()
        console.log(id)
        if(!id){
            return Response.json({message:"Unauthorized access"},{status:401})
        }
        const {group_name}= await req.json();
        const user = await User.findById({id})
        const group = await Group.create({
            group_name,created_by:user?.username,member:[{user_id:id,roles:"creator"}]
        })
        group.save();
        return Response.json({message:"Group created successfully",},{status:201})
    } catch (error:any) {
        console.log("Error during creating group:",error.message);
        return Response.json({message:"Error durign creating group",error:error.message},{status:500})
    }
}