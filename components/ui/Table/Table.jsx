"use client";

export default function Table({ columns, data, query, currentPage }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-lg text-sm">

        <thead>
          <tr>
            {columns?.map((col, index) => (
              <th key={index} className="p-2 border">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td
                colSpan={columns?.length}
                className="text-center p-4 text-gray-500"
              >
                No data available...
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="text-center">
                {columns.map((col, j) => (
                  <td key={j} className="p-2 border">
                    {row[col?.name]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}