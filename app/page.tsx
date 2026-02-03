"use client"
import { useEffect, useState } from "react"
import { sendRequest } from "@/helpers/setRequest"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserData } from "@/types/types"


const page = () => {
  // const[username,setUsername]=useState<string>("")
  const[password,setPassword]=useState<string>("")
  const[email,setEmail]=useState<string>("")

  const handleSubmit =()=>{
    const data = {
      email:email,
      password:password
    }
    const res = sendRequest(data);
    console.log(res)
  }
  return (
    <>
      {/* <Input onChange={(e)=>setUsername(e.target.value)} value={username} placeholder="Enter username"/> */}
      <Input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter email"/>
      <Input onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter password"/>
      <Button onClick={handleSubmit} className="cursor-pointer">Submit</Button>
    </>
  )
}

export default page