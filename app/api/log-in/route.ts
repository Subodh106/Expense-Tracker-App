import connectdb from "@/db/connectDb"
import { user } from "@/models/User.model";
import { verifyPassword } from "@/helpers/verifyPassword";
import { setCookies } from "@/helpers/setCookies";
import { createJWT } from "@/helpers/createJwt";
export async function POST(req:Request) {
    try {
        await connectdb()
        const{email,password}=await req.json();
        if(email==""||password==""){
            return Response.json({message:"Something is missing"},{status:422})
        }
        const isUserExist = await user.findOne({email});
        if(!isUserExist){
            return Response.json({message:"User doesn't exist . Please create your account"},{status:401})
        }
        const isPasswordVerified = await verifyPassword(password,isUserExist.password);
        if(!isPasswordVerified){
            return Response.json({message:"Invalid credentails"},{status:401})
        }
        const id = isUserExist?._id;
        if(!id){
            return Response.json({message:"User doesn't exist"},{status:409})
        }
        const token = createJWT(id.toString())
        const isCookieSet = await setCookies(token);
        if(!isCookieSet){
            return Response.json({message:"Server Error"},{status:500})
        }
        return Response.json({message:"User login successfully",
            data: isUserExist.username},{status:200})
    } catch (error:any) {
        console.log("Error during login user:",error.message)
        return Response.json({message:"Error druing login user",error:error.message},{status:500})
    }
}