"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      
      <h1 className="text-xl font-bold">Admin Panel</h1>

      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold" > 
        Logout 
      </button>

    </nav>
  );
}