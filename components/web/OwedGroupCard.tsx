import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TripCardGreen() {
  return (
    <Card className="w-full max-w-sm md:max-w-xl overflow-hidden border-slate-200 shadow-sm flex flex-col min-h-55">
      {/* 1. Top Section */}
      <div className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-[#1e293b]">
            Trip to Pokhara
          </CardTitle>
          <div className="h-px w-full bg-slate-100 mt-2" />
        </CardHeader>

        <CardContent>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-slate-700 font-semibold">
                Members: <span className="font-bold text-slate-900 ml-1">3</span>
              </p>
              <p className="text-slate-700 font-semibold">
                Total: <span className="font-bold text-slate-900 ml-1">Rs. 7,500</span>
              </p>
            </div>
            
            {/* Custom Green Group Icon */}
            <div className="flex items-end text-[#5cb85c]"> {/* Green color for icon */}
               <Users size={48} fill="currentColor" />
            </div>
          </div>
        </CardContent>
      </div>

      {/* 2. Bottom "Sticky" Section - Green themed */}
      <div className="bg-[#e6ffee] p-4 border-t border-green-200"> {/* Light green background, green border */}
        <p className="text-[#28a745] font-bold text-lg"> {/* Darker green text */}
          You Are Owed: Rs. 150
        </p>
      </div>
    </Card>
  );
}