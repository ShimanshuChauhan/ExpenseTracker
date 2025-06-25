import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../api/axios";

type UpdateExpenseProps = {
  onUpdate: (open: boolean, idx: number) => void;
  initialData: {
    _id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
  };
  onSuccess: () => void;
};

export default function UpdateExpense({ onUpdate, initialData, onSuccess }: UpdateExpenseProps) {
  const [formData, setFormData] = useState({
    date: new Date(initialData.date).toISOString().split("T")[0],
    description: initialData.description,
    amount: String(initialData.amount),
    category: initialData.category,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "amount" && Number(value) < 0) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormChanged = () => {
    return (
      formData.date !== new Date(initialData.date).toISOString().split("T")[0] ||
      formData.description !== initialData.description ||
      Number(formData.amount) !== initialData.amount ||
      formData.category !== initialData.category
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormChanged()) {
      toast.info("No changes made.");
      onUpdate(false, -1);
      return;
    }

    try {
      await axios.patch(`/expenses/${initialData._id}`, {
        ...formData,
        amount: Number(formData.amount),
        date: new Date(formData.date),
      });

      toast.success("Expense updated!");
      onUpdate(false, -1);
      onSuccess();
    } catch (error) {
      toast.error("Failed to update expense");
      console.error("Update error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/expenses/${initialData._id}`);
      toast.success("Expense deleted!");
      onUpdate(false, -1);
      onSuccess(); // Refresh expenses after deletion
    } catch (error) {
      toast.error("Failed to delete expense");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center px-4 sm:px-6 md:px-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl flex flex-col gap-4"
      >
        <h3 className="text-2xl font-semibold text-center text-gray-800">Edit Expense</h3>

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
            onClick={() => onUpdate(false, -1)}
            className="bg-gray-200 px-4 py-2 text-sm rounded-md hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 px-4 py-2 text-sm rounded-md hover:bg-red-700 text-white"
          >
            Delete
          </button>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 text-sm rounded-md hover:bg-blue-700 text-white"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
