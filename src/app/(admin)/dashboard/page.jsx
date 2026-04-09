"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Card from "../../../../components/Card/page.jsx"
import Heading from "../../../../components/Heading/Heading.jsx";
import CustomButton from "../../../../components/Button/CustomButton";
import { MockData } from "../../../../components/MockData/MockData.js";

export default function Dashboard() {
  const router = useRouter();

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
    <div className="h-[calc(100vh-68px)]  bg-gray-300 p-6 overflow-y-auto">

      <Heading title="Admin Dashboard" className="pt-3 pb-10" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

        <Card title="Users" value={stats?.users} />
        <Card title="Submissions" value={stats?.submissions} />
        <Card title="Transactions" value={stats?.transactions} />
        <Card title="Total Amount" value={`${stats?.amount}`} />

      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center">

        <CustomButton title="View Submissions" onClick={() => router.push("/dashboard/submissions")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"/>
        <CustomButton title="View Transactions" onClick={() => router.push("/dashboard/transactions")} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"/>

      </div>

    </div>
  );
}
