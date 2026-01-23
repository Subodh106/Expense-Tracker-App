import { connectDb } from "@/db/connectDb";
import { todoModel } from "@/models/todo.model";

export async function POST(request:Request) {
    await connectDb()
   try {
    const{todo,iscompleted} = await request.json()
    console.log("1")
    if(!todo||typeof iscompleted !=="boolean"){
            return Response.json({
                success:false,
                message:"Something is missing"
                },
                {status:400})
            }
    const newTodo = await todoModel.create({
        todo,iscompleted
    })
    console.log("success")
    return Response.json({
        success:true,
        message:"todo is created successfully",
        todo:newTodo
    },{
        status:200
    })
   } catch (error:any) {
        console.log("Error during creating todo",error)
        return Response.json({
            message:"Error without try :",
            error:error.message
        })
   }
}