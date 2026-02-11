"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createExpenseReq } from "@/helpers/createExpensereq"
import { ExpenseData } from "@/types/types"

const page = () => {

  const data = {
    group_id:"698080b1a5595d4398de252c",
    split:[{
      user_id:"6980734444f7be396db040c5",
      amount:500
    }
    ],
    total_amount:5000,
    description:"adsfsafsdsfaf"
  }
  const handleSubmit = ()=>{
    const result = createExpenseReq(data);
    console.log(result)
  }
  return (
    
    <div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default page