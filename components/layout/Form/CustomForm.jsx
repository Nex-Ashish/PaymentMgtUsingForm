"use client"

import { useState } from "react";
import CustomButton from "../../ui/Button/CustomButton.jsx";

export default function customForm({ fields, onSubmit, title, extra, open, setOpen }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">

      <div className="bg-white rounded-2xl p-7 w-full max-w-sm border border-zinc-200 shadow-sm">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-zinc-900">{title}</h1>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-full border border-zinc-200 text-zinc-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 flex items-center justify-center text-sm transition cursor-pointer"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field?.name} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium tracking-wide text-zinc-400">
                {field?.label}
              </label>
              <input
                type={field?.type}
                name={field?.name}
                value={formData[field?.name] || ""}
                onChange={handleChange}
                placeholder={field?.placeholder}
                required
                className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg "
              />
            </div>
          ))}

          {extra}

          <div className="flex gap-2 mt-2">
            {/* <button
              type="submit"
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition cursor-pointer"
            >
              Submit
            </button> */}

            <CustomButton title="Submit" type="submit" />
            
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 text-sm font-medium text-zinc-500 bg-zinc-100 hover:bg-red-50 cursor-pointer border  hover:border-red-200 rounded-lg "
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}