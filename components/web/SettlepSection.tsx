import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Wallet } from "lucide-react"; // Using Lucide icons which come with Shadcn

const SettleUpSection = () => {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-slate-800">Settle Up</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* You Owe Section */}
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-md border border-slate-100">
            <User className="w-5 h-5 text-slate-600" />
            <p className="text-sm font-bold text-slate-700">
              You owe <span className="font-bold text-slate-900">Amit Rs. 500</span>
            </p>
          </div>

          {/* You are Owed Section */}
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-md border border-slate-100">
            <Wallet className="w-5 h-5 text-slate-600" />
            <p className="text-sm text-slate-700">
              <span className="font-bold text-slate-900">Neha owes you Rs. 350</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettleUpSection;