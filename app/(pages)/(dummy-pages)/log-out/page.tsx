"use client"
import { Button } from "@/components/ui/button"
import { logoutreq } from "@/helpers/logoutreq"

const page = () => {
  const handleSubmit = ()=>{
    const res = logoutreq();
    console.log(res)
  }
  return (
    
    <div>
      <Button className="cursor-pointer" onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default page