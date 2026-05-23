import connectdb from "@/db/connectDb"
import { User } from "@/models/User.model";
import { verifyPassword } from "@/helpers/verifyPassword";
import { setCookies } from "@/helpers/setCookies";
import { createJWT } from "@/helpers/createJwt";
import { NextRequest,NextResponse } from "next/server";
import { apiResponse } from "@/helpers/apiresponse";
import { ApiError } from "@/helpers/apiError";
export async function POST(req: NextRequest) {
    try {
        await connectdb()
        const { email, password } = await req.json();
        console.log(email,password)
        if (email == "" || password == "") {
            throw new ApiError(422,"Something is missing");
        }
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
            throw new ApiError(401,"User doesn't Exist");
        }
        const isPasswordVerified = await verifyPassword(password, isUserExist.password);
        if (!isPasswordVerified) {
            throw new ApiError(401,"Invalid credentails")
        }
        const id = isUserExist?._id
        if (!id) {
            throw new ApiError(409,"User doens't exist");
        }
        const token = createJWT(id.toString())
        const isCookieSet = await setCookies(token);
        if (!isCookieSet) {
            throw new ApiError(500,"Internal server error");
        }
        return new apiResponse(200,"User login successfully");
    } catch (error: any) {
        console.log("Error during login user:", error.message)
        throw new ApiError(500,"Error during log in user",error.mesage);
    }
}