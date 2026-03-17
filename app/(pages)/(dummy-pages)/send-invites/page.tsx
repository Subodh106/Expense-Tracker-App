"use client"
import { Button } from "@/components/ui/button"
import { sendInvites } from "@/helpers/sendInvites"


const page = () => {

  const handleSubmit = ()=>{
    const result = sendInvites({invitedUser_id:"69b6e6fcc46d85351507d3e2"});
    console.log(result)
  }
  return (
    
    <div>
      <Button className="cursor-pointer" onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default page