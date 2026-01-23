"use client"
import React, { useState } from 'react'
import { connectDb } from '@/db/connectDb'
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { sendRequest } from '@/utils/sendRequest'


interface Data{
    todo:string,
    iscompleted:boolean
}


const Page = () => {
  const [data,setData]=useState<string>("")
  const handleSubmit=()=>{
    const Datas ={
      todo :data ,
      iscompleted:false
    }
    const result =sendRequest(Datas)
    console.log(result)
  }
  return (
    <>
      <div>
        <Field >
          <FieldLabel htmlFor="todo">Enter todo</FieldLabel>
          <Input onChange={(e)=>{setData(e.target.value)}} value={data} id="todo" type="text" placeholder="Enter your todo" />
          <Button className='max-w-fit cursor-pointer' onClick={handleSubmit}>Submit</Button>
          <Button className='max-w-fit'>Update</Button>
        </Field>
      </div>
    </>
  )
}

export default Page