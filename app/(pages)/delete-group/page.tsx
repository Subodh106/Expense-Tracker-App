"use client"
import { Button } from "@/components/ui/button"
import { deleteGroupreq } from "@/helpers/deleteGroupreq"
import { getexpensereq } from "@/helpers/getexpensereq"

const page = () => {
  const handleSubmit = ()=>{
    const res = deleteGroupreq();
    console.log(res)
  }
  return (
    
    <div>
      <Button className="cursor-pointer" onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default page