import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentExpenseSection = () => {
  const expenses = [
    { text: "You paid Rs. 500 in Trip to Goa" },
    { text: "Amit paid Rs. 300 in Office Lunch" },
    { text: "Sita paid Rs. 200 in Goa Trip" },
  ];

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="">
        <CardTitle className="text-lg font-bold text-slate-800">Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-0">
        {expenses.map((expense, index) => (
          <div 
            key={index} 
            className={`py-3 px-4 text-sm text-blue-900 bg-blue-50 rounded-lg font-semibold ${
              index !== expenses.length - 1 ? "border-b border-slate-200" : ""
            }`}
          >
            {expense.text}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentExpenseSection;