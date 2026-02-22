
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const page = () => {
  return (
    <div>
      <Link href="/create-group"><Button className='cursor-pointer'>Create Group</Button></Link>
      <Link href="/log-in"> <Button className='cursor-pointer'>login</Button></Link>
      <Link href="/log-out"> <Button className='cursor-pointer m-5'>Log out</Button></Link>
      <Link href="/delete-group"> <Button className='cursor-pointer m-5'>Delete Group</Button></Link>
      <Link href="/delete-expense"> <Button className='cursor-pointer m-5'>Delete Expense</Button></Link>
      <Link href="/get-expense"><Button className='cursor-pointer m-5'>Get Expense</Button></Link>
      <Link href="/get-user-data"><Button className='cursor-pointer m-5'>Get User Detail</Button></Link>
      <Link href="/create-expense"> <Button className='cursor-pointer m-5'>Create Expense</Button></Link>
    </div>
  )
}

export default page