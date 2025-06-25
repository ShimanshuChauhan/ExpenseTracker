import { CirclePlus } from "lucide-react";
import ExpenseTable from "../components/ExpenseTable";
import { useState } from "react";
import AddExpense from "../components/AddExpense";
import UpdateExpense from "../components/UpdateExpense";

const dummyExpenses = [
  { date: "2025-06-24", description: "Lunch at Subway", amount: 220, category: "Food" },
  { date: "2025-06-24", description: "Uber to Office", amount: 180, category: "Transport" },
  { date: "2025-06-23", description: "Amazon - Headphones", amount: 1299, category: "Shopping" },
  { date: "2025-06-22", description: "Groceries", amount: 450, category: "Essentials" },
  { date: "2025-06-21", description: "Movie ticket", amount: 300, category: "Entertainment" },
];


export default function Expenses() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const handleIsAddOpen = (open: boolean) => setIsAddOpen(open);

  return (
    <div className="rounded-lg shadow-md h-full relative">
      {/* Main content wrapper */}
      <div className={isAddOpen ? "blur-sm pointer-events-none select-none transition duration-300" : "transition duration-300"}>
        <div className="flex justify-between p-4">
          <h1 className="text-xl font-bold">Expenses</h1>
          <div className="flex gap-4">
            <button
              onClick={() => handleIsAddOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-500 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-300 hover:text-blue-500 transition-colors duration-200"
            >
              <CirclePlus size={24} />
              New Expense
            </button>
          </div>
        </div>

        <div className="w-full p-4">
          <ExpenseTable expenses={dummyExpenses} />
        </div>
      </div>

      {/* Overlay panel/modal */}
      {isAddOpen && (
        <AddExpense onOpen={handleIsAddOpen} />
      )}
    </div>
  );
}
