import { ApiError } from "@/helpers/apiError";
import { apiResponse } from "@/helpers/apiresponse";
import { getInfo } from "@/helpers/getinfo";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const id = await getInfo();
        if (!id) {
            throw new ApiError(false,401,"Unauthorized access")
        };
        const cookieStore = await cookies();
        cookieStore.delete("token");
        return new apiResponse(true,200,"User logout successfully");
    } catch (error: any) {
        console.log("Error during log out", error.message);
        throw new ApiError(false,500,"Error during log out user",error.message)
    }
}