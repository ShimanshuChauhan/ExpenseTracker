import { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseItem from "../components/ExpenseItem";
import AddExpense from "../components/AddExpense";
import UpdateExpense from "../components/UpdateExpense";
import axios from "../api/axios"; // 👈 make sure your axios instance is here
import { toast, ToastContainer } from "react-toastify";

type Expense = {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
};

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updateIdx, setUpdateIdx] = useState(-1);

  const handleIsAddOpen = (open: boolean) => setIsAddOpen(open);
  const handleIsUpdateOpen = (open: boolean, idx: number) => {
    setIsUpdateOpen(open);
    setUpdateIdx(idx);
  };

  // ✅ Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await axios.get("/expenses"); // Your backend route
      setExpenses(res.data.data.expenses); // Adjust based on response shape
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="rounded-lg shadow-md relative">
      {/* Main content */}
      <div
        className={
          isAddOpen || isUpdateOpen
            ? "blur-sm pointer-events-none select-none transition duration-300"
            : "transition duration-300"
        }
      >
        <div className="flex justify-between p-4">
          <h1 className="text-xl font-bold">Expenses</h1>
          <button
            onClick={() => handleIsAddOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-500 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-300 hover:text-blue-500 transition-colors duration-200"
          >
            <CirclePlus size={24} />
            New Expense
          </button>
        </div>

        <div className="w-full p-4">
          <ExpenseTable>
            {expenses.map((exp, idx) => (
              <ExpenseItem
                key={exp._id}
                idx={idx}
                exp={exp}
                onUpdate={handleIsUpdateOpen}
              />
            ))}
          </ExpenseTable>
        </div>
      </div>

      {/* Add and Update Modals */}
      {isAddOpen && (
        <AddExpense onOpen={handleIsAddOpen} onAdd={fetchExpenses} />
      )}
      {isUpdateOpen && expenses[updateIdx] && (
        <UpdateExpense
          onUpdate={handleIsUpdateOpen}
          initialData={expenses[updateIdx]}
          onSuccess={fetchExpenses}
        />
      )}
    </div>
  );
}
