import connectdb from "@/db/connectDb";
import { getInfo } from "@/helpers/getinfo";
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
export async function POST(req:Request) {
    try {
        await connectdb();
        const id = await getInfo()
        if(!id){
            return Response.json({message:"Unauthorized access"},{status:401})
        }
        const {group_name}= await req.json();
        const user = await User.findById(id)
        const group = await Group.create({
            group_name:group_name,created_by:id,member:[{user_id:id,roles:"creator"}]
        })
        return Response.json({message:"Group created successfully",},{status:201})
    } catch (error:any) {
        console.log("Error during creating group:",error.message);
        return Response.json({message:"Error durign creating group",error:error.message},{status:500})
    }
}