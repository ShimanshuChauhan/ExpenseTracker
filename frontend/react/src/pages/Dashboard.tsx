import { useState, useEffect } from "react";
import axios from '../api/axios';
import TimeFilter from "../components/TimeFilter";
import { useAuth } from "../auth/useAuth";
import LineChartView from "../components/LineCharView";
import { toast } from "react-toastify";
import TypeFilter from "../components/TypeFilter";
import PieChartView from "../components/PieChartView";

interface SummaryItem {
  date: string;
  total: number;
}

interface CategoryItem {
  category: string;
  total: number;
}

export default function Dashboard() {
  const [filter, setFilter] = useState("weekly"); // default to weekly
  const [type, setType] = useState("expense"); // default to expense
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [categorySummary, setCategorySummary] = useState<CategoryItem[]>([]);

  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        if (type === "expense") {
          const res = await axios.get(`/expenses/summary/by-date?range=${filter}`);
          setSummary(res?.data?.data?.summary?.[0]?.summary || []);
          setTotal(res?.data?.data?.summary?.[0]?.totalExpense || 0);

        } else if (type === "category") {
          const res = await axios.get(`/expenses/summary/by-category?range=${filter}`);
          setCategorySummary(res?.data?.data?.summary || []);
          setTotal(res?.data?.data?.totalExpense || 0);

        }
      } catch (err: any) {
        console.error("Error fetching summary:", err);
        toast.error(err.response?.data?.message || "Failed to fetch summary. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, type, token]);


  return (
    <div className="rounded-lg shadow-md">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <TimeFilter value={filter} onChange={setFilter} />
          <TypeFilter value={type} onChange={setType} />
        </div>
      </div>
      <h3 className="px-4 py-2 text-gray-600">
        Showing <strong>{filter}</strong> overview — Total ₹{total}
      </h3>

      <div className="p-4">
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (type === "expense" && summary.length === 0) ||
          (type === "category" && categorySummary.length === 0) ? (
          <div className="text-red-500 text-lg font-semibold">Add at least one expense to visualize.</div>
        ) : type === "expense" ? (
          <LineChartView data={summary} />
        ) : (
          <PieChartView data={categorySummary} />
        )}
      </div>


    </div>
  );
}

