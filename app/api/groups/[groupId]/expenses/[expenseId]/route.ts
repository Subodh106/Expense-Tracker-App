import connectdb from "@/db/connectDb";
import { ApiError } from "@/helpers/apiError";
import { apiResponse } from "@/helpers/apiresponse";
import { getInfo } from "@/helpers/getinfo";
import { Expense } from "@/models/Expense.model";
import { Group } from "@/models/Group.model";
import { User } from "@/models/User.model";
import { Types } from "mongoose";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

// for retriving the expenses

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ groupId: string }> },
) {
  try {
    await connectdb();
    const id = await getInfo();
    if (!id) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 },
      );
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid id formate" },
        { status: 400 },
      );
    }
    const isUserExist = await User.findById(new mongoose.Types.ObjectId(id));
    if (!isUserExist) {
      return NextResponse.json(
        { message: "User doesn't exist" },
        { status: 404 },
      );
    }
    const { groupId } = await params;

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return NextResponse.json(
        { message: "Invalid id formate" },
        { status: 400 },
      );
    }
    const isGroupExist = await Group.findById(
      new mongoose.Types.ObjectId(groupId),
    );
    if (!isGroupExist) {
      return NextResponse.json(
        { message: "Group doesn't exist" },
        { status: 404 },
      );
    }
    const isExpenseExist = await Expense.findById(
      new mongoose.Types.ObjectId(),
    );
    if (!isExpenseExist) {
      return NextResponse.json(
        { message: "Expense doesn't exist" },
        { status: 404 },
      );
    }
    const isUserExistInGroup = isGroupExist.member.some(
      (user: any) => user.user_id === id,
    );
    if (!isUserExistInGroup) {
      return NextResponse.json(
        { message: "User doesn't exist in group" },
        { status: 401 },
      );
    }
    const isExpenseExistInGroup = isExpenseExist.group_id === isGroupExist._id;
    if (!isExpenseExistInGroup) {
      return NextResponse.json({ message: "Expense doesn't exist in group" });
    }
    return new apiResponse(200, "Expense retrived successfully", {
      isExpenseExist,
    });
  } catch (error: any) {
    console.log("Error during retriving the expense:", error.message);
    return NextResponse.json(
      { message: "Errror during retriving the expense", error: error.message },
      { status: 500 },
    );
  }
}

// for deleting expense
export async function DELETE(
  _: any,
  { params }: { params: Promise<{ groupId: string; expenseId: string }> },
) {
  try {
    await connectdb();
    const id = await getInfo();
    if (!id) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 },
      );
    }
    const { groupId, expenseId } = await params;
    if (!mongoose.Types.ObjectId.isValid(id?.toString())) {
      return NextResponse.json(
        { message: "Invalid id formate" },
        { status: 400 },
      );
    }
    const isUserExist = await User.findById(new Types.ObjectId(id?.toString()));
    if (!isUserExist) {
      return NextResponse.json(
        { message: "User doesn't exist" },
        { status: 404 },
      );
    }
    if (!mongoose.Types.ObjectId.isValid(groupId && expenseId)) {
      return NextResponse.json(
        { message: "Invalid id formate" },
        { status: 400 },
      );
    }
    const isGroupExist = await Group.findOne({
      _id: new Types.ObjectId(groupId),
    });
    if (!isGroupExist) {
      return NextResponse.json(
        { message: "Group doesn't exist" },
        { status: 404 },
      );
    }
    const isExpenseExist = await Expense.findOne({
      _id: new Types.ObjectId(expenseId),
    });
    if (!isExpenseExist) {
      return NextResponse.json(
        { mesage: "Expense doesn't exist" },
        { status: 400 },
      );
    }
    const isExpenseExistInGroup =
      isExpenseExist.group_id.toString() == isGroupExist._id.toString();
    if (!isExpenseExistInGroup) {
      return NextResponse.json(
        { message: "Expense doesn't exist in that group" },
        { status: 404 },
      );
    }
    const isUserExistInGroupAndAuthorized = isGroupExist.member.some(
      (user: any) =>
        user.user_id == id &&
        (user.roles === "admin" || user.roles === "creator"),
    );
    if (!isUserExistInGroupAndAuthorized) {
      return NextResponse.json(
        { message: "User is not permitted to delete group" },
        { status: 403 },
      );
    }
    const deltedExpense = await Expense.deleteOne({
      _id: new Types.ObjectId(expenseId),
    });
    if (
      deltedExpense.acknowledged == false ||
      deltedExpense.deletedCount === 0
    ) {
      return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
    return new apiResponse(204, "Expense deleted successfully");
  } catch (error: any) {
    console.log("Error during deleting expense:", error.message);
    return NextResponse.json(
      { message: "Error during deleting expense", error: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ groupId: string; expenseId: string }> },
) {
  try {
    await connectdb();

    // Auth check
    const id = await getInfo();
    if (!id) {
      throw new ApiError(401, "Unauthorized access");
    }

    const { groupId, expenseId } = await params;

    //Validate IDs properly
    if (
      !mongoose.Types.ObjectId.isValid(groupId) ||
      !mongoose.Types.ObjectId.isValid(expenseId)
    ) {
      throw new ApiError(400, "Invalid id format");
    }

    //Fetch group
    const group = await Group.findById(groupId);
    if (!group) {
      throw new ApiError(404, "Group doesn't exist");
    }

    //Check user is in group
    const isUserInGroup = group.member.some(
      (user: any) => user.user_id.toString() === id.toString(),
    );

    if (!isUserInGroup) {
      throw new ApiError(403, "User is not a member of this group");
    }

    //Fetch expense
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      throw new ApiError(404, "Expense doesn't exist");
    }

    // Check expense belongs to group
    const belongsToGroup = expense.group_id.toString() === group._id.toString();

    if (!belongsToGroup) {
      throw new ApiError(400, "Expense doesn't belong to this group");
    }

    //Permission check (only creator can edit)
    const isAllowed = expense.paid_by.toString() === id.toString();

    if (!isAllowed) {
      throw new ApiError(403, "You are not allowed to edit this expense");
    }

    //Get request body
    const body = await req.json();

    //Merge for validation (future state)
    const updatedData = {
      ...expense.toObject(),
      ...body,
    };

    // Validation

    // amount must be positive
    if (updatedData.amount === undefined || updatedData.amount <= 0) {
      throw new ApiError(400, "Amount must be greater than 0");
    }

    // title validation
    if (!updatedData.title?.trim()) {
      throw new ApiError(400, "Title is required");
    }

    // split validation
    if (updatedData.split?.length) {
      const splitTotal = updatedData.split.reduce(
        (sum: number, split: { amount: number }) => sum + split.amount,
        0,
      );

      // check split values
      const invalidSplit = updatedData.split.some((s: any) => s.amount <= 0);

      if (invalidSplit) {
        throw new ApiError(400, "Split amounts must be greater than 0");
      }

      if (splitTotal !== updatedData.amount) {
        throw new ApiError(400, "Split total must equal expense amount");
      }
    }

    // Allow only safe fields
    const allowedUpdates: any = {};

    if (body.title !== undefined) allowedUpdates.title = body.title;
    if (body.amount !== undefined) allowedUpdates.amount = body.amount;
    if (body.category !== undefined) allowedUpdates.category = body.category;
    if (body.description !== undefined)
      allowedUpdates.description = body.description;
    if (body.split !== undefined) allowedUpdates.split = body.split;

    // 12. Updating DB
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      allowedUpdates,
      {
        new: true,
        runValidators: true,
      },
    );
    return NextResponse.json(
      new apiResponse(200, "Expense updated successfully", updatedExpense),
    );
  } catch (error: any) {
    console.log("Error during updating expense:", error.message);
    throw new ApiError(500, "Error during updating expense", error.message);
  }
}
