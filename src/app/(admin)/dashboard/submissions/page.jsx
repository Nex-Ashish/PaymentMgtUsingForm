"use client";

import { useEffect, useState } from "react";
import { MockData } from "../../../../../components/MockData/MockData";
import Table from "../../../../../components/Table/Table";
import Heading from "../../../../../components/Heading/Heading";
import FilterSubmission from "../../../../../components/Button/FilterSubmission";

export default function FormSubmissions() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all')

  const columns = [
    { header: "Name", name: "name" },
    { header: "Email", name: "email" },
    { header: "Message", name: "text" },
    { header: "Amount", name: "amount" },
    { header: "Status", name: "status" },
  ];

  useEffect(() => {
    const mock = MockData || [];

    const session = JSON.parse(sessionStorage.getItem("paymentData"));

    const sessionArray = session ? [session] : [];

    const combinedData = [...sessionArray, ...mock];

    const updatedData = combinedData.map((item) => ({ ...item, status: item?.status || "Completed", }));

    setData(updatedData);

    // console.log(combinedData,'aaa')
  }, []);

  const filterData = filter === 'all' ? data : data.filter( (item) => item?.status?.toLowerCase() === filter.toLowerCase() )

  return (
    <div className="h-[calc(100vh-68px)]  bg-gray-300 p-6 overflow-y-auto">

      <Heading title="Submissions" className="pt-3 pb-10" />

      <FilterSubmission value={filter} onChange={setFilter} />

      <div className="bg-white p-4 rounded-xl shadow">
        <Table columns={columns} data={filterData} />
      </div>
    </div>
  );
}