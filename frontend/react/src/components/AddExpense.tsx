import { useState } from "react";

type AddExpenseProps = {
  onOpen: (open: boolean) => void;
};

type ExpenseFormData = {
  date: string;
  description: string;
  amount: string;
  category: string;
};

export default function AddExpense({ onOpen }: AddExpenseProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: "",
    description: "",
    amount: "",
    category: "Select Category", // default
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'amount' && Number(value) < 0) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Expense:", formData);
    // TODO: send to backend or parent component
    onOpen(false);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center px-4 sm:px-6 md:px-10">
      <form
        onSubmit={handleSubmit}
        className="
          bg-white 
          w-full 
          max-w-sm 
          sm:max-w-md 
          md:max-w-lg 
          lg:max-w-xl 
          xl:max-w-2xl 
          p-4 sm:p-6 md:p-8 
          rounded-xl 
          shadow-xl 
          flex flex-col 
          gap-3 sm:gap-4 md:gap-5
        "
      >
        <h3 className="text-xl sm:text-2xl font-semibold text-center text-gray-800">
          Add New Expense
        </h3>

        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 sm:px-4 sm:py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />

        <input
          name="description"
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 sm:px-4 sm:py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 sm:px-4 sm:py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 sm:px-4 sm:py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
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

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpen(false)}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
}
