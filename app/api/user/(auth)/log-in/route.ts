import connectdb from "@/db/connectDb"
import { User } from "@/models/User.model";
import { verifyPassword } from "@/helpers/verifyPassword";
import { setCookies } from "@/helpers/setCookies";
import { createJWT } from "@/helpers/createJwt";
import { Group } from "@/models/Group.model";
import { NextRequest,NextResponse } from "next/server";
import { apiResponse } from "@/helpers/apiresponse";
import { ApiError } from "@/helpers/apiError";
export async function POST(req: NextRequest) {
    try {
        await connectdb()
        const { email, password } = await req.json();
        console.log(email,password)
        if (email == "" || password == "") {
            throw new ApiError(false,422,"Something is missing");
        }
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
            throw new ApiError(false,401,"User doesn't Exist");
        }
        const isPasswordVerified = await verifyPassword(password, isUserExist.password);
        if (!isPasswordVerified) {
            return NextResponse.json({success:false,message: "Invalid credentails" }, { status: 401 })
        }
        const id = isUserExist?._id
        if (!id) {
            throw new ApiError(false,409,"User doens't exist");
        }
        const token = createJWT(id.toString())
        const isCookieSet = await setCookies(token);
        if (!isCookieSet) {
            throw new ApiError(false,500,"Internal server error");
        }
        return new apiResponse(true,200,"User login successfully");
    } catch (error: any) {
        console.log("Error during login user:", error.message)
        throw new ApiError(false,500,"Error during log in user",error.mesage);
    }
}