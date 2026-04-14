"use client";

import { useRouter } from "next/navigation";

export default function UserNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex flex-col gap-4 md:flex-row md:gap-10 items-center justify-between shadow-md ">
      
      <h1 className="text-xl font-bold">Welcome</h1>

      <div className="flex justify-between flex-col items-center gap-10 md:flex-row md:gap-10">
        <h1 className="text-sm font-medium border p-3 rounded-2xl">Developed by - Ashish</h1>

        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold" > 
            Admin Login 
        </button>
      </div>

    </nav>
  );
}