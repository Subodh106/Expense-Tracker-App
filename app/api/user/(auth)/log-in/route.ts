import connectdb from "@/db/connectDb"
import { User } from "@/models/User.model";
import { verifyPassword } from "@/helpers/verifyPassword";
import { setCookies } from "@/helpers/setCookies";
import { createJWT } from "@/helpers/createJwt";
import { Group } from "@/models/Group.model";
import { NextRequest,NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        await connectdb()
        const { email, password } = await req.json();
        console.log(email,password)
        if (email == "" || password == "") {
            return NextResponse.json({ message: "Something is missing" }, { status: 422 })
        }
        const isUserExist = await
            User.findOne({ email });
        if (!isUserExist) {
            return NextResponse.json({ message: "User doesn't exist . Please create your account" }, { status: 401 })
        }
        const isPasswordVerified = await verifyPassword(password, isUserExist.password);
        if (!isPasswordVerified) {
            return NextResponse.json({ message: "Invalid credentails" }, { status: 401 })
        }
        const id = isUserExist?._id
        if (!id) {
            return NextResponse.json({ message: "User doesn't exist" }, { status: 409 })
        }
        const token = createJWT(id.toString())
        console.log(token)
        const isCookieSet = await setCookies(token);
        console.log(isCookieSet)
        if (!isCookieSet) {
            return NextResponse.json({ message: "Server Error" }, { status: 500 })
        }
        const groups = await Group.find({"member.user_id":id})
        return NextResponse.json({
            message: "User logged in successfully", data: {
                username: isUserExist.username,
                email: isUserExist.email,
                groups: groups,
            }
        }, { status: 200 })
    } catch (error: any) {
        console.log("Error during login user:", error.message)
        return NextResponse.json({ message: "Error during login user", error: error.message }, { status: 500 })
    }
}