import connectdb from "@/db/connectDb";
import { user } from "@/models/User.model";
import { hashPassword } from "@/helpers/hashPassword";
import { createJWT } from "@/helpers/createJwt";
import { setCookies } from "@/helpers/setCookies";



export async function POST(req:Request) {
    try {
        await connectdb();
        const{username,email,password}=await req.json();
        if(username ==" " || email==" " || password==" "){
            return Response.json({message:"Somthing is missing"},{status:422})
        }
        const isUserExist = await user.findOne({email})
        if(isUserExist){
            return Response.json({message:"User already exist , Please login !"},{status:409})
        }
        const hashedPassword= await hashPassword(password);
        const createdUser = await user.create({
            username,
            email,
            password:hashedPassword
        })
        const id = createdUser?._id;
        if(!id){
            return Response.json({message:"User creation failed"},{status:409})
        }
        const token = createJWT(id.toString());
        const isCookieSet = await setCookies(token);
        if(!isCookieSet){
            return Response.json({message:"Server Error"},{status:500})
        }
        return Response.json({message:"User successfully created",data:{username}},{status:201})
    } catch (error:any) {
        console.log("Error during creating user:",error.message)
        return Response.json({message:"Error during creating user",error:error.message},{status:500})
    }
}