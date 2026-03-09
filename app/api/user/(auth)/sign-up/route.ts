import connectdb from "@/db/connectDb";
import { User } from "@/models/User.model";
import { hashPassword } from "@/helpers/hashPassword";
import { createJWT } from "@/helpers/createJwt";
import { setCookies } from "@/helpers/setCookies";
import { NextResponse , NextRequest } from "next/server";


export async function POST(req:NextRequest) {
    try {
        await connectdb();
        const{username,email,password}=await req.json();
        if(username ==" " || email==" " || password==" "){
            return NextResponse.json({message:"Somthing is missing"},{status:422})
        }
        const isUserExist = await User.findOne({email})
        if(isUserExist){
            return NextResponse.json({message:"User already exist , Please login !"},{status:409})
        }
        const hashedPassword= await hashPassword(password);
        const createdUser = await User.create({
            username,
            email,
            password:hashedPassword
        })
        const id = createdUser?._id;
        if(!id){
            return NextResponse.json({message:"User creation failed"},{status:409})
        }
        const token = createJWT(id.toString());
        const isCookieSet = await setCookies(token);
        if(!isCookieSet){
            return NextResponse.json({message:"Server Error"},{status:500})
        }
        return NextResponse.json({message:"User successfully created",data:{username}},{status:201})
    } catch (error:any) {
        console.log("Error during creating user:",error.message)
        return NextResponse.json({message:"Error during creating user",error:error.message},{status:500})
    }
}