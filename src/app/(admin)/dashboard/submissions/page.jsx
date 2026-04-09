"use client";

import { useEffect, useState } from "react";
import { MockData } from "../../../../../components/MockData/MockData";
import Table from "../../../../../components/Table/Table";
import Heading from "../../../../../components/Heading/Heading";

export default function FormSubmissions() {
  const [data, setData] = useState([]);

  const columns = [
    { header: "Name", name: "name" },
    { header: "Email", name: "email" },
    { header: "Message", name: "text" },
    { header: "Amount", name: "amount" }
  ];

  useEffect(() => {
    const mock = MockData || [];

    const session = JSON.parse(sessionStorage.getItem("paymentData"));

    const sessionArray = session ? [session] : [];

    const combinedData = [...sessionArray, ...mock];

    setData(combinedData);
  }, []);

  return (
    <div className="h-[calc(100vh-68px)]  bg-gray-300 p-6 overflow-y-auto">

      <Heading title="Submissions" className="pt-3 pb-10" />

      <div className="bg-white p-4 rounded-xl shadow">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}