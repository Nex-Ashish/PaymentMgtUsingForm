"use client"

import { useEffect, useState } from "react";
import CustomForm from "../../../components/layout/Form/CustomForm.jsx";
import { useRouter } from "next/navigation";
import Tabs from "../../../components/ui/Tab/Tab.jsx";
import Table from "../../../components/ui/Table/Table.jsx";
import Loading from "../../../components/ui/Loader/Loading.jsx";

export default function UserForm() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter name" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
    { name: "text", label: "Text", type: "text", placeholder: "Enter something" },
    { name: "amount", label: "Amount", type: "text", placeholder: "Enter amount" }
  ];

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData) => {
    try {
      setLoading(true)

      const res = await fetch('/api/form', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })

      // console.log('hhello')
      // console.log(res,'ddd')

      const data = await res.json();
      // console.log('post-dataa',data)

      if (!res.ok) {
        alert("Error saving data");
        return;
      }
      setOpen(false);

      sessionStorage.setItem("paymentData", JSON.stringify(formData));
      router.push("/payment");
    } catch (error) {
      // console.log('error',error)
      alert('Error: Post api failed ',error)
    } finally{
      setLoading(false)
    }
  };

  const [transaction, setTransaction] = useState(null);
  
  const columns = [
    { header: "Name", name: "name" },
    { header: "Email", name: "email" },
    { header: "Text", name: "text" },
    { header: "Amount", name: "amount" },
  ];

  const tabData = [
    {
      label: "Form",
      content: (
        <div className="bg-white border border-zinc-200 rounded-2xl p-8 flex flex-col items-center gap-4">
          <p className="text-xl font-medium text-gray-400">User Payment Form</p>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Click below to open the form and submit your payment details.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition"
          >
            + Open Form
          </button>
        </div>
      )
    },
    {
    label: "Transactions",
    content: (
      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4 text-center">Transactions</h2>

        <Table columns={columns} data={transaction ? [transaction] : []} />

      </div>
    )
  }
  ];

  useEffect(() => {
    const data = sessionStorage.getItem("paymentData");
    if (data) {
      setTransaction(JSON.parse(data));
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh" }} className="bg-red-200 p-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        <div className="bg-red-700 text-white text-center text-lg  rounded-xl px-6 py-4 font-semibold tracking-wider">
          Payment Management System Using Form
        </div>

        {/* <div className="grid gap-2 place-items-end">
          <div className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-800">
            Developed by - Ashish Panwar
          </div>
          <div onClick={() => router.push('/login')} className="cursor-pointer hover:bg-gray-300 bg-black border text-white border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium hover:text-black">
            Log Out
          </div>
        </div> */}

        <Tabs tabs={tabData} />

      </div>

      {loading ?
        <Loading />
        : 
        <CustomForm open={open} setOpen={setOpen} fields={fields} onSubmit={handleSubmit} title="User Form" />
      }

    </div>
  );
}