"use client";

import { useState } from "react";
import Image from "next/image";
import sidebarIcon from "../../../public/icons/sidebar.svg";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Home", path: "/dashboard" },
    { name: "Submissions", path: "/dashboard/submissions" },
    { name: "Transactions", path: "/dashboard/transactions" },
  ];

  return (
    <>
      <div className="md:hidden p-3">
        <button onClick={() => setOpen(true)}>
          <Image src={sidebarIcon} width={35} height={35} alt="menu" className="p-2 bg-white rounded-lg shadow" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}

      <div
        className={`fixed md:static top-0 left-0 h-full z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 flex flex-col
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} >

        <div className="md:hidden flex justify-end p-3">
          <button onClick={() => setOpen(false)} className="text-gray-600 cursor-pointer rounded-full w-8 flex items-center justify-center hover:bg-red-400 h-8 p-2 border">
            X
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 mt-4 pb-4 border-b">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
            A
          </div>
          <p className="text-gray-700 font-medium">Admin</p>
        </div>

        <div className="flex flex-col gap-2 mt-4 px-3">
          {menu.map((item) => (
            <button
              key={item.path} onClick={() => { router.push(item.path); setOpen(false); }} 
              className={`cursor-pointer text-left px-4 py-2 rounded-md transition ${ pathname === item.path ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100" }`} > 
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}