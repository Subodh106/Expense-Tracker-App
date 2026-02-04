import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const page = () => {
  return (
    <div>
        <Link href="/create-group"> <Button>Create Group</Button></Link>
        <Link href="/login"> <Button>login</Button></Link>
    </div>
  )
}

export default page