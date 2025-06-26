type TimeFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function TimeFilter({ value, onChange }: TimeFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 rounded-lg text-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-lg"
    >
      <option value="daily" className="bg-white">Daily</option>
      <option value="weekly" className="bg-white">Weekly</option>
      <option value="monthly" className="bg-white">Monthly</option>
    </select>
  );
}
