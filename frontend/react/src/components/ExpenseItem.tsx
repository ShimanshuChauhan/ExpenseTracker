type ExpenseItemProps = {
  idx: number,
  exp: {
    date: string;
    description: string;
    amount: number;
    category: string;
  },
  onUpdate: (open: boolean, idx: number) => void;
};

const categoryColors: Record<string, string> = {
  Food: "bg-green-100 text-green-800",
  Transport: "bg-yellow-100 text-yellow-800",
  Health: "bg-red-100 text-red-800",
  Shopping: "bg-pink-100 text-pink-800",
  Bills: "bg-purple-100 text-purple-800",
  Entertainment: "bg-indigo-100 text-indigo-800",
  Other: "bg-gray-100 text-gray-800",
};

export default function ExpenseItem({ idx, exp, onUpdate }: ExpenseItemProps) {

  return (
    <tr
      key={idx}
      className={`transition-colors duration-150 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-100 cursor-pointer`}
      onClick={() => onUpdate(true, idx)}
    >
      <td className="px-1 py-1 sm:px-3 sm:py-2 md:px-6 md:py-4 font-medium text-gray-600">
        {new Date(exp.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>
      <td className="px-1 py-1 sm:px-3 sm:py-2 md:px-6 md:py-4 text-gray-700">
        {exp.description}
      </td>
      <td className="px-1 py-1 sm:px-3 sm:py-2 md:px-6 md:py-4 text-green-600 font-semibold">
        ₹{exp.amount}
      </td>
      <td className="px-1 py-1 sm:px-3 sm:py-2 md:px-6 md:py-4">
        <span
          className={`inline-block font-medium text-[9px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full ${categoryColors[exp.category] || "bg-gray-100 text-gray-800"
            }`}
        >
          {exp.category}
        </span>
      </td>
    </tr>
  );
}