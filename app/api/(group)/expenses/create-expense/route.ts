import connectdb from "@/db/connectDb"
import { getInfo } from "@/helpers/getinfo";
import { Group } from "@/models/Group.model"

export async function POST(req: Request) {
    try {
        await connectdb()
        const id = await getInfo();
        if (!id) {
            return Response.json({ message: "Unauthorized access" }, { status: 401 })
        }
        const { group_id, splits, user_id, total_amount, description } = await req.json();
        if (group_id == "" || splits == "" || user_id == "" || total_amount <= 0) {
            return Response.json({ message: "Something is missing" }, { status: 422 })
        }
        const isgroupExist = await Group.findById(group_id);
        if (!isgroupExist) {
            return Response.json({ message: "Group doesn't exist" }, { status: 403 })
        }
        const isMember = isgroupExist.member.some(
            (m: any) => m.user_id.toString() === id
        );

        if (!isMember) {
            return Response.json({ message: "Not group member" }, { status: 403 });
        }

        const invalidUser = splits.find((split: any) => !isgroupExist.member.some(member => member.user_id === split.user_id)
        );

        if (invalidUser) {
            return Response.json({ message: "Unauthorized access" }, { status: 403 });
        }
        const isPayerInGroup = isgroupExist.member.some(
            (m: any) => m.user_id.toString() === user_id
        );

        if (!isPayerInGroup) {
            return Response.json({ message: "Payer not in group" }, { status: 403 });
        }


    } catch (error: any) {
        console.log("Error during creating expense:", error.message)
        return Response.json({ message: "Error during creating expense", error: error.message }, { status: 500 })
    }
}