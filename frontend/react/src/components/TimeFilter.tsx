interface TimeFilterProps {
  value: string;
  onChange: (val: string) => void;
}

export default function TimeFilter({ value, onChange }: TimeFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 rounded bg-blue-500 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-200 focus:text-blue-600 focus:text-lg transition-colors shadow-md"
    >
      <option value="weekly">Last 7 Days</option>
      <option value="monthly">Last 30 Days</option>
      <option value="6months">Last 6 Months</option>
    </select>
  );
}
