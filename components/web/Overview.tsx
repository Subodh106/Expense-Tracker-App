"use client"
import { Separator } from '@radix-ui/react-separator'
import React, { JSX } from 'react'
import { Card, CardDescription, CardTitle } from '../ui/card'
import { GroupIcon } from 'lucide-react'

const Overview = () => {
  return (
    <div className="p-3 rounded-xl m-3 border-slate-200 shadow-sm bg-white">
        <h1 className="text-xl font-bold">Overview</h1>
        <Separator className="w-full mb-3 mt-1 bg-black"/>
        <div className="flex flex-col md:flex-row ld:flex-row items-center justify-center gap-5 cursor-pointer">
          <Card className="w-full max-w-md bg-[#fef2f2]">
            <CardTitle className=" text-[#b91c1c] text-center">You Owe</CardTitle>
            <CardDescription className="text-xl md:text-2xl lg:text-3xl text-[#b91c1c] font-bold text-center">Rs. 1,200</CardDescription>
          </Card>
          <Card className="w-full max-w-md bg-[#e6ffee]">
            <CardTitle className="text-[#28a745]  text-center">You Are Owed</CardTitle>
            <CardDescription className="text-xl md:text-2xl lg:text-3xl text-[#28a745]  font-bold text-center">Rs. 1,200</CardDescription>
          </Card>
          <Card className="w-full max-w-md  bg-[#e4e6fe]">
            <CardTitle className="text-[#285fa7]   text-center">Total Groups</CardTitle>
            <CardDescription className="text-3xl text-blue-600 font-bold text-center"><span className="flex justify-center items-center gap-10">
              <span className="text-xl md:text-2xl lg:text-3xl">3</span> <GroupIcon/>
              </span>
              </CardDescription>
          </Card>
        </div>
      </div>
  )
}

export default Overview