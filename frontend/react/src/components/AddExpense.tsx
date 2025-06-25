import { useState } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";

type AddExpenseProps = {
  onOpen: (open: boolean) => void;
  onAdd: () => void; // 👈 trigger refresh after adding
};

type ExpenseFormData = {
  date: string;
  description: string;
  amount: string;
  category: string;
};

export default function AddExpense({ onOpen, onAdd }: AddExpenseProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: "",
    description: "",
    amount: "",
    category: "Select Category",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'amount' && Number(value) < 0) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/expenses/create", {
        ...formData,
        amount: Number(formData.amount),
        date: new Date(formData.date),
      });
      onAdd();       // 🔄 refresh expenses
      onOpen(false); // ✅ close modal
      toast.success("Expense added successfully!");
    } catch (err) {
      toast.error(err?.response?.data.message || "Failed to add expense!");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center px-4 sm:px-6 md:px-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl flex flex-col gap-4"
      >
        <h3 className="text-2xl font-semibold text-center text-gray-800">Add New Expense</h3>

        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded-md"
          required
        />

        <input
          name="description"
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded-md"
          required
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded-md"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded-md"
          required
        >
          <option value="Select Category" disabled>Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Health">Health</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onOpen(false)}
            className="bg-gray-200 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
