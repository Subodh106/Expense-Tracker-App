import { getInfo } from "@/helpers/getinfo";
import { cookies } from "next/headers";

export async function DELETE() {
    try {
        const id = await getInfo();
        if (!id) {
            return Response.json({ message: "Unauthorized access" }, { status: 401 })
        };
        const cookieStore = await cookies();
        cookieStore.delete("token");
        return Response.json({message:"User log out successfully"},{status:200})
    } catch (error: any) {
        console.log("Error during logging out", error.message);
        return Response.json({ message: "Error during loggin out", error: error.message }, { status: 500 })
    }
}