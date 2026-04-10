"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MockData } from "../MockData/MockData";
import Heading from "../Heading/Heading";
import SearchBar from "../SearchBar/SearchBar";
import FilterSubmission from "../Button/FilterSubmission";
import Table from "../Table/Table";

export default function FormSubmissionData() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all')

  // const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1; // for pagination case in future

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

  const filteredData = data.filter((item) => { 
                        if (filter === "all") return true; 

                        return item?.status?.toLowerCase() === filter.toLowerCase(); 
                        })

                        // filter === 'all' ? data : data.filter( (item) => item?.status?.toLowerCase() === filter.toLowerCase() )
                        .filter((item) => {
                          if(!query) return true

                          return (
                            item?.name?.toLowerCase().includes(query.toLowerCase())
                          )

                        })

  return (
    <div className="h-[calc(100vh-68px)]  bg-gray-300 p-6 overflow-y-auto">

      <Heading title="Submissions" className="pt-3 pb-10" />

      <SearchBar placeholder="Search..." />

      <FilterSubmission value={filter} onChange={setFilter} />

      <div className="bg-white p-4 rounded-xl shadow">
        
        <Table columns={columns} data={filteredData} query={query} currentPage={currentPage} />

      </div>
    </div>
  );
}