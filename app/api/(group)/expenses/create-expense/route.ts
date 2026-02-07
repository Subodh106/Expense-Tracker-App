import connectdb from "@/db/connectDb"
import { getInfo } from "@/helpers/getinfo";
import { Expense } from "@/models/Expense.model";
import { Group } from "@/models/Group.model"

export async function POST(req: Request) {
    try {
        await connectdb()
        const id = await getInfo();
        if (!id) {
            return Response.json({ message: "Unauthorized access" }, { status: 401 })
        }
        const { group_id, split, user_id, total_amount, description } = await req.json();
        if (!group_id || !split?.length || !user_id || total_amount <= 0) {
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

        const invalidUser = split.find((split: any) => !isgroupExist.member.some(member => member.user_id === split.user_id)
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

        // ================= BUSINESS LOGIC =================

        // 1. Separate manual & equal splits
        const mannulsplits = split.filter((s: any) => s.amount !== undefined);
        const equalsplits = split.filter((s: any) => s.amount === undefined);

        // 2. Final data structure
        let finalsplit: any[] = [];
        let usedAmount = 0;

        // 3. Manual split processing
        for (const s of mannulsplits) {
            if (s.amount <= 0) {
                return Response.json({ message: "Invalid split amount" }, { status: 400 });
            }

            usedAmount += Number(s.amount);

            finalsplit.push({
                user_id: s.user_id,
                amount: Number(s.amount)
            });
        }

        // 4. Remaining amount
        const remainingAmount = Number(total_amount) - usedAmount;

        if (remainingAmount < 0) {
            return Response.json({ message: "Split amount exceeds total amount" }, { status: 400 });
        }

        // 5. Equal split logic
        if (equalsplits.length > 0) {
            const equalAmount = Number((remainingAmount / equalsplits.length).toFixed(2));

            for (const s of equalsplits) {
                finalsplit.push({
                    user_id: s.user_id,
                    amount: equalAmount
                });
            }
        }

        // 6. Final validation
        const finaltotal = finalsplit.reduce((sum, s) => sum + s.amount, 0);

        if (Number(finaltotal.toFixed(2)) !== Number(Number(total_amount).toFixed(2))) {
            return Response.json({ message: "Split total mismatch with total amount" }, { status: 400 });
        }


        const expenseData = {
            group_id: group_id,
            paid_by: user_id,
            total_amount: total_amount,
            description: description,
            split: finalsplit,
            created_by: id,
        }
        const created_Expense = await Expense.create(expenseData);
        if (!created_Expense) {
            return Response.json({ message: `Internal Error druing creating expense` }, { status: 500 })
        };
        return Response.json({ message: "Expense created successfully", data: expenseData }, { status: 201 });

    } catch (error: any) {
        console.log("Error during creating expense:", error.message)
        return Response.json({ message: "Error during creating expense", error: error.message }, { status: 500 })
    }
}