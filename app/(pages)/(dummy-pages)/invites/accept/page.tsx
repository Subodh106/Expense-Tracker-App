"use client"
import { Button } from "@/components/ui/button"
import { acceptInvites, sendInvites } from "@/helpers/sendInvites"


const page = () => {

  const handleSubmit = ()=>{
    const result = acceptInvites();
    console.log(result)
  }
  return (
    
    <div>
      <Button className="cursor-pointer" onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default page