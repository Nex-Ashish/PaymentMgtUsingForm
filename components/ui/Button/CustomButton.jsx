"use client";

export default function CustomButton({ title, onClick, type = "button", className, }) {
  const defaultClass = "flex-1 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition cursor-pointer";

  return (
    <button type={type} onClick={onClick} className={className ? className : defaultClass} > {title} </button>
  );
}