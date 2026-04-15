"use client";

import { useEffect, useState } from "react"
import Card from "../../../../components/ui/Card/page.jsx"
import Heading from "../../../../components/layout/Heading/Heading.jsx";
import { MockData } from "../../../../components/common/MockData/MockData.js";
import Sidebar from "../../../../components/layout/Sidebar/Sidebar.jsx";
import Loading from "../../../../components/ui/Loader/Loading.jsx";

export default function Dashboard() {

  // const [stats, setStats] = useState({
  //   users: 0,
  //   submissions: 0,
  //   transactions: 0,
  //   amount: 0,
  // });
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  // useEffect(() => {
  //   const mock = MockData || [];
  //   const session = JSON.parse(sessionStorage.getItem("paymentData"));
  //   const sessionArray = session ? [session] : [];

  //   const allData = [...mock, ...sessionArray];

  //   setStats({
  //       users: allData.length, 
  //       submissions: allData.length,
  //       transactions: allData.length,
  //       amount: allData.reduce((acc, curr) => acc + Number(curr?.amount || 0), 0),
  //   });
  //   }, []);

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

          setData({
            users: result?.data.length, 
            submissions: result?.data.length,
            transactions: result?.data.length,
            amount: result?.data.reduce((acc, curr) => acc + Number(curr?.amount || ""), 0),
          });
          // setData(result?.data); 
        } catch (error) {
          console.log('error',error)
          // alert('Error: ',error)
        } finally{
          setLoading(false)
        }
      }
      getFormData()
    }, [])

  return (
    <div className="h-[calc(100vh-68px)]  bg-gray-300  overflow-y-auto flex">

      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">

        <Heading title="Admin Dashboard" className="pt-3 pb-10" />

        { loading ?
          <Loading />
          :
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

            <Card title="Users" value={data?.users} />
            <Card title="Submissions" value={data?.submissions} />
            <Card title="Transactions" value={data?.transactions} />
            <Card title="Total Amount" value={data?.amount} />

          </div>
        }

        

      </div>

    </div>
  );
}
