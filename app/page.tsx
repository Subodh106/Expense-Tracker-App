import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const page = () => {
  return (
    <div>
        <Link href="/create-group"> <Button className='cursor-pointer'>Create Group</Button></Link>
        <Link href="/login"> <Button className='cursor-pointer'>login</Button></Link>
        <Link href="/create-expense"> 
          <Button className='cursor-pointer m-5'>Create Expnse</Button>
        </Link>
    </div>
  )
}

export default page