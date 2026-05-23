import connectdb from "@/db/connectDb";
import { User } from "@/models/User.model";
import { hashPassword } from "@/helpers/hashPassword";
import { createJWT } from "@/helpers/createJwt";
import { setCookies } from "@/helpers/setCookies";
import { NextResponse , NextRequest } from "next/server";
import { apiResponse } from "@/helpers/apiresponse";
import { ApiError } from "@/helpers/apiError";


export async function POST(req:NextRequest) {
    try {
        await connectdb();
        const{username,email,password}=await req.json();
        if(username ==" " || email==" " || password==" "){
            // return NextResponse.json({message:"Somthing is missing"},{status:422})
            throw new ApiError(422,"Something is missing");
        }
        const isUserExist = await User.findOne({email})
        if(isUserExist){
            throw new ApiError(409 , "User already exist , Please login !" )
        }
        const isUsernameUnique = await User.findOne({username});
        if(isUsernameUnique){
            throw new ApiError(409,"Username is already taken!");
        }
        const hashedPassword= await hashPassword(password);
        const createdUser = await User.create({
            username,
            email,
            password:hashedPassword
        })
        const id = createdUser?._id;
        if(!id){
            throw new ApiError(409,"User creation failed");
        }
        const token = createJWT(id.toString());
        const isCookieSet = await setCookies(token);
        if(!isCookieSet){
            // return NextResponse.json({message:"Server Error"},{status:500})
            throw new ApiError(500,"Internal server Error")
        }
        return new apiResponse(201,"User created successfully");
    } catch (error:any) {
        console.log("Error during creating user:",error.message)
        throw new ApiError(500,"Error during creating user",error.message)
    }
}