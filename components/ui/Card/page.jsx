// "use client";

export default function Card({ title, value, className = "" }) {
  return (
    <div
      className={`bg-white rounded-xl p-4 shadow-sm text-center ${className}`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-semibold mt-1">{value}</h2>
    </div>
  );
}