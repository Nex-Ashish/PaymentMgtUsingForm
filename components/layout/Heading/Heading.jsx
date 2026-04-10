"use client";

export default function Heading({ title, subtitle, className = "" }) {
  return (
    <div className={`text-center ${className}`}>
      <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}