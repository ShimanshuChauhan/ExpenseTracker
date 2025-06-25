export default function ExpenseTable({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg shadow-sm border border-gray-200 bg-white w-full">
      <div className="overflow-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px] lg:max-h-[700px] xl:max-h-[800px]">
        <table className="min-w-full table-auto border-collapse text-[11px] sm:text-sm md:text-base">
          <thead className="bg-blue-50 text-gray-700 font-semibold sticky top-0 z-10">
            <tr>
              <th className="text-left px-1 py-1 sm:px-3 sm:py-2 md:px-6 md:py-4">Date</th>
              <th className="text-left px-1 py-1 sm:px-3 sm:py-2 md:px-6 md:py-4">Description</th>
              <th className="text-left px-1 py-1 sm:px-3 sm:py-2 md:px-6 md:py-4">Amount</th>
              <th className="text-left px-1 py-1 sm:px-3 sm:py-2 md:px-6 md:py-4">Category</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}
