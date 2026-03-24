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
          <Card className="w-full max-w-md bg-red-200">
            <CardTitle className="text-red-600 text-center">You Owe</CardTitle>
            <CardDescription className="text-lg md:text-2xl lg:text-3xl text-red-600 font-bold text-center">Rs. 1,200</CardDescription>
          </Card>
          <Card className="w-full max-w-md bg-green-200">
            <CardTitle className="text-green-600 text-center">You Are Owed</CardTitle>
            <CardDescription className="text-xl md:text-2xl lg:text-3xl text-green-600 font-bold text-center">Rs. 1,200</CardDescription>
          </Card>
          <Card className="w-full max-w-md  bg-blue-200">
            <CardTitle className="text-blue-600 text-center">Total Groups</CardTitle>
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