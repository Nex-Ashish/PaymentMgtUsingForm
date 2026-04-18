"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MockData } from "../MockData/MockData";
import Heading from "../../layout/Heading/Heading";
import SearchBar from "../../ui/SearchBar/SearchBar";
import FilterSubmission from "../../ui/Button/FilterSubmission";
import Table from "../../ui/Table/Table";
import Loading from "../../ui/Loader/Loading";

export default function FormSubmissionData() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all')

  // const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1; // for pagination case in future

  const [loading, setLoading] = useState(false)

  const columns = [
    { header: "Name", name: "name" },
    { header: "Email", name: "email" },
    { header: "Message", name: "text" },
    { header: "Amount", name: "amount" },
    { header: "Status", name: "status" },
    // { header: "Action", name: "action" },
  ];

  
    useEffect( () => {
      const getFormData = async () => {
        try {
          setLoading(true)
          const res = await fetch('/api/form', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const result = await res.json()
          // console.log('get-data',result)
          // setData([...result])

          const updatedData = (result?.data || []).map((item) => ({ ...item, status: "completed", }));

          setData(updatedData); 
        } catch (error) {
          console.log('error',error)
          // alert('Error: ',error)
        } finally{
          setLoading(false)
        }
      }
      getFormData()
    }, [])

  const filteredData = data.filter((item) => { 
                        if (filter === "all") return true; 

                        return item?.status?.toLowerCase() === filter.toLowerCase(); 
                        })

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
        
        { loading ?
          <Loading />
          : 
          <Table columns={columns} data={filteredData} query={query} currentPage={currentPage} edit={(row) => console.log("Edit:", row)} />
        }

      </div>
    </div>
  );
}