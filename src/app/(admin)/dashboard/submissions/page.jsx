"use client";

import { Suspense, useEffect, useState } from "react";
import { MockData } from "../../../../../components/MockData/MockData";
import Table from "../../../../../components/Table/Table";
import Heading from "../../../../../components/Heading/Heading";
import FilterSubmission from "../../../../../components/Button/FilterSubmission";
import SearchBar from "../../../../../components/SearchBar/SearchBar";
import { useSearchParams } from "next/navigation";

export default function FormSubmissions() {
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
        
        <Suspense key={query + currentPage} >
          <Table columns={columns} data={filteredData} query={query} currentPage={currentPage} />
        </Suspense>

      </div>
    </div>
  );
}