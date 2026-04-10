"use client";

import { useEffect, useState } from "react";
import { MockTransactions } from "../MockData/MockTransaction";
import Heading from "../Heading/Heading";
import SearchBar from "../SearchBar/SearchBar";
import FilterTransaction from "../Button/FilterTransaction";
import Table from "../Table/Table";
import { useSearchParams } from "next/navigation";

export default function TransactionData() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all')

  const searchParams = useSearchParams()
  const query = searchParams?.get("query") || ""
  const currentPage = Number(searchParams.get("page")) || 1; // for pagination case in future

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

  const filteredData = data.filter( (item) => {
                          if(filter === "all") return true
      
                          return item?.method.toLowerCase()[0] === filter.toLowerCase()[0]
                        })
                        // filter === "all" ? data : data?.filter((item) => item?.method.toLowerCase()[0] === filter.toLowerCase()[0] )

                        .filter((item) => {
                          if(!query) return true

                          return ( item?.name?.toLowerCase().includes(query.toLowerCase()) )
                        })

  return (
    <div className="h-[calc(100vh-68px)]  bg-gray-300 p-6 overflow-y-auto">

      <Heading title="Transactions" className="pt-3 pb-10" />

      <SearchBar placeholder="Search..." />

      <FilterTransaction value={filter} onChange={setFilter} />

      <div className="bg-white p-4 rounded-xl shadow">
        
          <Table columns={columns} data={filteredData} query={query} currentPage={currentPage} />

      </div>
    </div>
  );
}