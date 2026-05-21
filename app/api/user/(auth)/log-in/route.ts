import connectdb from "@/db/connectDb"
import { User } from "@/models/User.model";
import { verifyPassword } from "@/helpers/verifyPassword";
import { setCookies } from "@/helpers/setCookies";
import { createJWT } from "@/helpers/createJwt";
import { Group } from "@/models/Group.model";
import { NextRequest,NextResponse } from "next/server";
import { apiResponse } from "@/helpers/apiresponse";
export async function POST(req: NextRequest) {
    try {
        await connectdb()
        const { email, password } = await req.json();
        console.log(email,password)
        if (email == "" || password == "") {
            return NextResponse.json({ message: "Something is missing" }, { status: 422 })
        }
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
            return NextResponse.json({ message: "User doesn't exist . Please create your account" }, { status: 401 })
        }
        const isPasswordVerified = await verifyPassword(password, isUserExist.password);
        if (!isPasswordVerified) {
            return NextResponse.json({success:false,message: "Invalid credentails" }, { status: 401 })
        }
        const id = isUserExist?._id
        if (!id) {
            return NextResponse.json({success:false,message: "User doesn't exist" }, { status: 409 })
        }
        const token = createJWT(id.toString())
        const isCookieSet = await setCookies(token);
        if (!isCookieSet) {
            return NextResponse.json({success:false,message: "Server Error" }, { status: 500 })
        }
        // return new apiResponse(200,"User login successfully",)
        return new apiResponse(true,200,"User login successfully")
    } catch (error: any) {
        console.log("Error during login user:", error.message)
        return NextResponse.json({success:false, message: "Error during login user", error: error.message }, { status: 500 })
    }
}