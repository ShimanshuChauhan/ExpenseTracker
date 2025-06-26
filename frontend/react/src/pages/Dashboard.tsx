import { useState, useEffect } from "react";
import axios from '../api/axios';
import TimeFilter from "../components/TimeFilter";
import { useAuth } from "../auth/useAuth";
import LineChartView from "../components/LineCharView";
import { toast } from "react-toastify";

interface SummaryItem {
  date: string;
  total: number;
}

export default function Dashboard() {
  const [filter, setFilter] = useState("weekly"); // default to weekly
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/expenses/summary/by-date?range=${filter}`);
        setSummary(res.data.data.summary[0].summary);
        setTotal(res.data.data.summary[0].totalExpense);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch summary. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, token]);

  return (
    <div className="rounded-lg shadow-md">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <TimeFilter value={filter} onChange={setFilter} />
      </div>

      <div className="px-4 py-2 text-gray-600">
        Showing <strong>{filter}</strong> overview — Total ₹{total}
      </div>

      {loading ? (
        <div className="p-4 text-gray-500">Loading...</div>
      ) : (
        <div className="p-4">
          <LineChartView data={summary} />
        </div>
      )}
    </div>
  );
}

