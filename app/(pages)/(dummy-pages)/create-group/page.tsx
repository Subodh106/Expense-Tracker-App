"use client"
import { useEffect, useState } from "react"
import { sendRequest } from "@/helpers/setRequest"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GroupData, UserData } from "@/types/types"
import { creategroupReq } from "@/helpers/creategroupreq"

const page = () => {
  // const[username,setUsername]=useState<string>("")
  // const[password,setPassword]=useState<string>("")
  const[group,setGroup]=useState<string>("")
  const handleSubmit =()=>{
    const data:GroupData = {
      group_name:group
    }
    const res = creategroupReq(data);
    console.log(res)
  }
  return (
    <>
      {/* <Input onChange={(e)=>setUsername(e.target.value)} value={username} placeholder="Enter username"/> */}
      <Input onChange={(e)=>setGroup(e.target.value)} value={group} placeholder="Enter group name"/>
      {/* <Input onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter password"/> */}
      <Button onClick={handleSubmit} className="cursor-pointer">Submit</Button>
    </>
  )
}

export default page
