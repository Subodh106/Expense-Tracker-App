import connectdb from "@/db/connectDb"
import { getInfo } from "@/helpers/getinfo";
import { Expense } from "@/models/Expense.model";
import { Group } from "@/models/Group.model"
import { User } from "@/models/User.model";
import mongoose, { mongo, Types } from "mongoose";
import { NextResponse , NextRequest } from "next/server";

export async function POST(req: NextRequest,{params}:{params:Promise<{groupId:string}>}) {
    try {
        await connectdb()
        const id = await getInfo();
        if (!id) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
        }
        if(!mongoose.Types.ObjectId.isValid(id?.toString())){
            return NextResponse.json({message:"Invalid id formate"},{status:400})
        }
        const isUserExist = await User.findById(new Types.ObjectId(id?.toString()));
        if(!isUserExist){
            return NextResponse.json({message:"User doesn't exist"},{status:404})
        }
        const {groupId} = await params;
        const { split, total_amount, description } = await req.json();
        if (!groupId || !split?.length || total_amount <= 0) {
            return NextResponse.json({ message: "Something is missing" }, { status: 422 })
        }
        if(!mongoose.Types.ObjectId.isValid(groupId)){
            return NextResponse.json({message:"Invalid id formate"},{status:400})
        }
        const isgroupExist = await Group.findOne({_id:new Types.ObjectId(groupId)});

        if (!isgroupExist) {
            return NextResponse.json({ message: "Group doesn't exist" }, { status: 403 })
        }
        const isMember = isgroupExist.member.some(
            (m: any) => m.user_id.toString() === id
        );

        if (!isMember) {
            return NextResponse.json({ message: "Not group member" }, { status: 403 });
        }

        const invalidUser = split.find((split: any) => isgroupExist.member.some(member => member.user_id === split.user_id)
        );
        if (invalidUser) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 403 });
        }
        const isPayerInGroup = isgroupExist.member.some(
            (m: any) => m.user_id.toString() === id
        );

        if (!isPayerInGroup) {
            return NextResponse.json({ message: "Payer not in group" }, { status: 403 });
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
                return NextResponse.json({ message: "Invalid split amount" }, { status: 400 });
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
            return NextResponse.json({ message: "Split amount exceeds total amount" }, { status: 400 });
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
            return NextResponse.json({ message: "Split total mismatch with total amount" }, { status: 400 });
        }

        console.log(groupId)
        const expenseData = {
            group_id: groupId,
            paid_by: id,
            total_amount: total_amount,
            description: description,
            split: finalsplit,
            created_by: id,
        }
        const created_Expense = await Expense.create(expenseData);
        if (!created_Expense) {
            return NextResponse.json({ message: `Internal Error druing creating expense` }, { status: 500 })
        };
        return NextResponse.json({ message: "Expense created successfully", data: expenseData }, { status: 201 });

    } catch (error: any) {
        console.log("Error during creating expense:", error.message)
        return NextResponse.json({ message: "Error during creating expense", error: error.message }, { status: 500 })
    }
}