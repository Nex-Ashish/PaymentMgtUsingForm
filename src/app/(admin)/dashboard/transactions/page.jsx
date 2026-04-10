"use client";

import { useEffect, useState } from "react";
import Table from "../../../../../components/Table/Table";
import { MockTransactions } from "../../../../../components/MockData/MockTransaction";
import Heading from "../../../../../components/Heading/Heading";
import FilterTransaction from "../../../../../components/Button/FilterTransaction";

export default function Transactions() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all')

  const columns = [
    { header: "Name", name: "name" },
    { header: "Email", name: "email" },
    { header: "Amount (₹)", name: "amount" },
    { header: "Payment ID", name: "paymentId" },
    { header: "Method", name: "method" }
  ];

  useEffect(() => {
    const mock = MockTransactions || []
    const session = JSON.parse(sessionStorage.getItem("paymentData"));

    const sessionTxn = session
      ? [{
          name: session.name,
          email: session.email,
          amount: session.amount,
          paymentId: "TXN" + Math.floor(Math.random() * 100000),
          method: "UPI"
        }]
      : [];

    const combinedData = [...sessionTxn, ...mock];

    setData(combinedData);
    // console.log(combinedData,'ddd')
  }, []);

  const filteredData = filter === "all" ? data : data?.filter((item) => item?.method.toLowerCase()[0] === filter.toLowerCase()[0] )

  return (
    <div className="h-[calc(100vh-68px)]  bg-gray-300 p-6 overflow-y-auto">

      <Heading title="Transactions" className="pt-3 pb-10" />

      <FilterTransaction value={filter} onChange={setFilter} />

      <div className="bg-white p-4 rounded-xl shadow">
        <Table columns={columns} data={filteredData} />
      </div>
    </div>
  );
}