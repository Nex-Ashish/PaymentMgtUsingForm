"use client";

import { useEffect, useState } from "react"
import Card from "../../../../components/ui/Card/page.jsx"
import Heading from "../../../../components/layout/Heading/Heading.jsx";
import { MockData } from "../../../../components/common/MockData/MockData.js";
import Sidebar from "../../../../components/layout/Sidebar/Sidebar.jsx";

export default function Dashboard() {

  const [stats, setStats] = useState({
    users: 0,
    submissions: 0,
    transactions: 0,
    amount: 0,
  });

  useEffect(() => {
    const mock = MockData || [];
    const session = JSON.parse(sessionStorage.getItem("paymentData"));
    const sessionArray = session ? [session] : [];

    const allData = [...mock, ...sessionArray];

    setStats({
        users: allData.length, 
        submissions: allData.length,
        transactions: allData.length,
        amount: allData.reduce((acc, curr) => acc + Number(curr?.amount || 0), 0),
    });
    }, []);

  return (
    <div className="h-[calc(100vh-68px)]  bg-gray-300  overflow-y-auto flex">

      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">

        <Heading title="Admin Dashboard" className="pt-3 pb-10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

          <Card title="Users" value={stats?.users} />
          <Card title="Submissions" value={stats?.submissions} />
          <Card title="Transactions" value={stats?.transactions} />
          <Card title="Total Amount" value={`${stats?.amount}`} />

        </div>

      </div>

    </div>
  );
}
