"use client"

export default function CustomButton({ title, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex-1 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition cursor-pointer"
    >
      {title}
    </button>
  );
}