//Table.tsx
interface Column<T> {
  key: keyof T | string;
  label: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage: string;
  loading?: boolean;
}

function TableCell({
  columnName,
  content,
}: {
  columnName: string;
  content: any;
}) {
  if (columnName == "Specialties") {
    return (
      <ul className="list-disc">
        {content.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  } else {
    return <span>{content}</span>;
  }
}

//loading state implemented but doesn't look good since local response is too quick (screen flashes) -- SZ
export default function Table<T>({
  data,
  columns,
  emptyMessage,
  loading = false,
}: TableProps<T>) {
  if (data.length < 1) {
    return <span className="tex-lg">{emptyMessage}</span>;
  }
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left table-auto border border-stone-600 border-collapse rounded-lg">
        <thead className="bg-stone-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key.toString()}
                className="border-2 border-stone-300 p-8 text-left"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="odd:bg-white even:bg-stone-200 hover:opacity-75 hover:cursor-pointer"
            >
              {columns.map((column) => {
                const cellValue = row[column.key as keyof T];
                return (
                  <td
                    key={column.key.toString()}
                    className={`border-2 border-stone-300 p-8 text-left`}
                  >
                    <TableCell columnName={column.label} content={cellValue} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
