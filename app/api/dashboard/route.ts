import { getInfo } from "@/helpers/getinfo";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const id = await getInfo();
    } catch (error:any) {
        console.log("Error during getting info of dashboard:",error.message);
        return NextResponse.json({success:false,message:"Error during getting info of dashboard"},{status:500})
    }
}