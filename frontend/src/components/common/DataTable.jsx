import { useState } from 'react';

const DataTable = ({ columns, data, pageSize = 10 }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = data.filter((row) =>
    columns.some((col) =>
      String(row[col.key] ?? '').toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="glass rounded-card p-5 dark:bg-slate-800/60">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 rounded-lg border border-border text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-textDark/60 dark:text-slate-300 border-b border-border">
              {columns.map((col) => (
                <th key={col.key} className="py-2 px-3 font-medium">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr
                key={row._id || i}
                className="border-b border-border/60 hover:bg-primary/5 dark:hover:bg-white/5"
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-2 px-3">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-6 text-textDark/50">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 rounded-lg border border-border disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded-lg border border-border disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;