"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createExpenseReq } from "@/helpers/createExpensereq"
import { ExpenseData } from "@/types/types"

const page = () => {

  const data = {
    group_id:"698c540b738b7771f02d9c4f",
    split:[
        {
        user_id:"698080b1a5595d4398de252c",
        amount:500
    }
    ],
    total_amount:500,
    description: "Games"
}
  const handleSubmit = ()=>{
    const result = createExpenseReq(data);
    console.log(result)
  }
  return (
    
    <div>
      <Button className="cursor-pointer" onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default page