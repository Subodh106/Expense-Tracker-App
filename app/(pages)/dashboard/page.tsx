import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GroupIcon, PlusIcon, Users, Users2, Users2Icon } from "lucide-react";

const DashboardPage = () => {
  return (
    <div>
      <div>
        <div>
          <h1 className="text-2xl font-bold"> Hey, Boss</h1>
          <Separator className="w-full mb-3 mt-1 bg-black mx-2"/>
        </div>
        <div className="flex items-center justify-items-center gap-5 w-full max-w-md mx-auto ">
          <Button className="cursor-pointer"> <PlusIcon/> Create Group</Button>
          <Button className="cursor-pointer">View Invites</Button>
        </div>
      </div>
      <div className="overview border border-black p-3 rounded-xl m-2 shadow-xl">
        <h1 className="text-xl font-bold">Overview</h1>
        <Separator className="w-full mb-3 mt-1 bg-black"/>
        <div className="flex items-center justify-center gap-5 cursor-pointer">
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
              </span></CardDescription>
          </Card>
        </div>
      </div>
      <div className="groups">
          <Users2/>
      </div>
      <div className="recent-expenses">

      </div>
      <div className="pending-invites">

      </div>
      <div className="settle-up">

      </div>
    </div>
  )
}
export default DashboardPage