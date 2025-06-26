type TypeFilterProps = {
  value: string;
  onChange: (val: string) => void;
}

export default function TypeFilter({ value, onChange }: TypeFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 rounded bg-blue-500 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-200 focus:text-blue-600 focus:text-lg transition-colors shadow-md"
    >
      <option value="expense">By Expenses</option>
      <option value="category">By Category</option>
    </select>
  );
}