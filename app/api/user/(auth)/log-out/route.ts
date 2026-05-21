import { apiResponse } from "@/helpers/apiresponse";
import { getInfo } from "@/helpers/getinfo";
import { cookies } from "next/headers";
import { NextResponse  } from "next/server";

export async function POST() {
    try {
        const id = await getInfo();
        if (!id) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
        };
        const cookieStore = await cookies();
        cookieStore.delete("token");
        return new apiResponse(true,200,"User logout successfully");
    } catch (error: any) {
        console.log("Error during logging out", error.message);
        return NextResponse.json({ message: "Error during logging out", error: error.message }, { status: 500 })
    }
}