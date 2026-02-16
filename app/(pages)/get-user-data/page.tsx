"use client"
import { Button } from "@/components/ui/button"
import { getUserDatareq } from "@/helpers/getUserdatareq"

const page = () => {
  const handleSubmit = ()=>{
    const res = getUserDatareq();
    console.log(res)
  }
  return (
    
    <div>
      <Button className="cursor-pointer" onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default page