"use client"
import { Button } from "@/components/ui/button"
import { getUserDatareq } from "@/helpers/getUserdatareq"
import { usernamechangereq } from "@/helpers/usernamechangereq"

const page = () => {
  const handleSubmit = ()=>{
    const res = getUserDatareq();
    console.log(res)
  }
  const handleUsernameChange = ()=>{
    const res = usernamechangereq({username:"hello"})
  }
  return (
    
    <div>
      <Button className="cursor-pointer" onClick={handleSubmit}>Submit</Button>
      <Button className="cursor-pointer ml-4" onClick={handleUsernameChange}>Change Username</Button>
    </div>
  )
}

export default page