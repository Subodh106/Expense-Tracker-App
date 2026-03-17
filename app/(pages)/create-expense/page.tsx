"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createExpenseReq } from "@/helpers/createExpensereq"
import { ExpenseData } from "@/types/types"

const page = () => {

  const data = {
    split:[
        {
        user_id:"69b6e6fcc46d85351507d3e2",
        amount:500
      },{
        user_id:"69ada625a8319db0880fd5d8",
        amount:100
      }
    ],
    total_amount:600,
    description: "New expense"
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