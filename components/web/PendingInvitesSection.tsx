import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PendingInvitesComponent = () => {
  const invites = [
    { group: "Weekend Getaway" },
    { group: "Birthday Bash" },
  ];

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800">Pending Invites</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-0">
        {invites.map((invite, index) => (
          <div 
            key={index} 
            className={`py-3 px-4 text-sm font-semibold text-blue-900 bg-blue-50 flex items-center justify-between ${
              index !== invites.length - 1 ? "border-b border-slate-200" : ""
            }`}
          >
            <span>
              Join <span className="font-semibold">"{invite.group}"</span> Group
            </span>
            <div className="flex gap-2">
              <button className="text-blue-600 hover:underline font-medium cursor-pointer">[Accept]</button>
              <button className="text-blue-600 hover:underline font-medium cursor-pointer">[Decline]</button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PendingInvitesComponent;