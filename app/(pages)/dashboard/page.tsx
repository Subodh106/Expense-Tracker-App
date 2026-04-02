import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Overview from "@/components/web/Overview";
import { Separator } from "@/components/ui/separator";
import { GroupIcon, PlusIcon, Users, Users2, Users2Icon } from "lucide-react";
import GroupsSection from "@/components/web/GroupsSection";
import RecentExpenseSection from "@/components/web/Recent-Expense-Section";

const DashboardPage = () => {
  return (
    <div className="px-4 overflow-hidden bg-gray-100 h-full">
      <div>
        <div>
          <h1 className="text-2xl  font-bold"> Hello, Ray </h1>
          <Separator className=" mb-3 mt-1 bg-black"/>
        </div>
        <div className="flex items-center justify-center gap-5 w-full max-w-md mx-auto ">
          <Button className="cursor-pointer hover:bg-green-500 bg-green-600"> <PlusIcon/> Create Group</Button>
          <Button className="cursor-pointer" variant={"outline"}>View Invites</Button>
        </div>
      </div>
        <Overview/>
      <div className="groups">
          <GroupsSection/>
      </div>
      <div className="recent-expenses">
        <RecentExpenseSection/>
      </div>
      <div className="pending-invites">

      </div>
      <div className="settle-up">

      </div>
    </div>
  )
}
export default DashboardPage