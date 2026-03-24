
import { ChevronRight } from 'lucide-react'
import React from 'react'
import OweGroupCard from './OweGroupCard'
import OwedGroupCard from './OwedGroupCard'

const GroupsSection = () => {
  return (
    <div className='GroupSection  p-3 rounded-xl m-3 border border-slate-200 bg-white'>
        <div className="title flex justify-between">
            <span>
              <h1 className='font-bold text-lg'>
                Your Groups
              </h1>
            </span>
            <span className='flex items-center justify-center text-sm hover:underline cursor-pointer'>
                <h1>View All Groups</h1>
                <ChevronRight size={18}/>
            </span>
        </div>
        <div className="GroupCards flex justify-center items-center gap-5 m-5 flex-col md:flex-row lg:flex-row">
          <OweGroupCard/>
          <OwedGroupCard/>
        </div>
    </div>
  )
}

export default GroupsSection