import { useState } from "react";
import TimeFilter from "../components/TimeFilter"; // adjust path as needed

export default function Dashboard() {
  const [filter, setFilter] = useState("daily");

  return (
    <div className="rounded-lg shadow-md">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <TimeFilter value={filter} onChange={setFilter} />
      </div>

      {/* Placeholder for filtered data (e.g., chart or list) */}
      <div className="p-4 text-gray-600">
        Showing: <strong>{filter}</strong> overview
      </div>
    </div>
  );
}
