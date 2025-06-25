import ExpenseItem from "./ExpenseItem";

export default function ExpenseTable({
  expenses
}: {
  expenses: {
    date: string;
    description: string;
    amount: number;
    category: string;
  }[],
}
) {

  return (

    <div className="rounded-lg shadow-sm border border-gray-200 bg-white w-full overflow-x-auto">
      <table className="min-w-full table-auto border-collapse text-[11px] sm:text-sm md:text-base">
        <thead className="bg-blue-50 text-gray-700 font-semibold">
          <tr>
            <th className="text-left px-1 py-1 sm:px-3 sm:py-2 md:px-6 md:py-4">Date</th>
            <th className="text-left px-1 py-1 sm:px-3 sm:py-2 md:px-6 md:py-4">Description</th>
            <th className="text-left px-1 py-1 sm:px-3 sm:py-2 md:px-6 md:py-4">Amount</th>
            <th className="text-left px-1 py-1 sm:px-3 sm:py-2 md:px-6 md:py-4">Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, idx) => (
            <ExpenseItem
              key={idx}
              idx={idx}
              exp={exp}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
