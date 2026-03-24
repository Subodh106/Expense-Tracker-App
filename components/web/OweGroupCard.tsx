import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OweGroupCard() {
  return (
    <Card className="w-full max-w-sm md:max-w-xl overflow-hidden border-slate-200 shadow-sm flex flex-col min-h-55">
      {/* 1. Top Section */}
      <div className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-[#1e293b]">
            Trip to Kathmandu
          </CardTitle>
          <div className="h-px w-full bg-slate-100 mt-2" />
        </CardHeader>

        <CardContent>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-slate-700 font-semibold">
                Members: <span className="font-bold text-slate-900 ml-1">4</span>
              </p>
              <p className="text-slate-700 font-semibold">
                Total: <span className="font-bold text-slate-900 ml-1">Rs. 5,000</span>
              </p>
            </div>
            
            <div className="flex items-end text-[#e15b5b]">
               <Users size={48} fill="currentColor" />
            </div>
          </div>
        </CardContent>
      </div>

      {/* 2. Bottom "Sticky" Section */}
      <div className="bg-[#fef2f2] p-4 border-t border-red-100">
        <p className="text-[#b91c1c] font-bold text-lg">
          You Owe: Rs. 300
        </p>
      </div>
    </Card>
  );
}