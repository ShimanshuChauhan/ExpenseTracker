import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042",
  "#a4de6c", "#d0ed57", "#8dd1e1"
];

interface Props {
  data: { category: string; total: number }[];
}

export default function PieChartView({ data }: Props) {
  return (
    <div className="shadow-md rounded-xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 h-full sm:h-[320px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 text-center">
        Category Breakdown
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius="90%" // percentage-based radius makes it auto-scale
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => `₹${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
