"use client";
import { useState } from "react";
import CustomForm from "../../layout/Form/CustomForm";

export default function Table({ columns, data, edit, query, currentPage }) {
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter name" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
    { name: "text", label: "Text", type: "text", placeholder: "Enter something" },
    { name: "amount", label: "Amount", type: "text", placeholder: "Enter amount" }
  ];

  const handleSubmit = async (formData) => {
    try {
      const { status, id, ...updatedData } = formData; 
      const res = await fetch('/api/form', {
        method: "PATCH",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedRow.id,
          ...updatedData
        })
      })
      const data = await res?.json();
      window.location.reload()
      // console.log(data,'patch-data')
    } catch (error) {
      console.log('Edit api fail')
    }
  }

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
            {edit && (
              <th className="p-2 border">Action</th>
            )}
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
                {edit && (
                  <td className="p-2 border">
                    <button
                      onClick={() => { 
                        setSelectedRow(row)
                        setOpen(true)
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-400 hover:scale-105"
                    >
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>

      </table>

      {open &&
        <CustomForm fields={fields} onSubmit={handleSubmit} title="Edit Details" open={open} setOpen={setOpen} initialData={selectedRow} />
      }
    </div>
  );
}
