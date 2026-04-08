"use client"

import { useEffect, useState } from "react";
import CustomForm from "../../../components/Form/CustomForm.jsx";
import { useRouter } from "next/navigation";
import Tabs from "../../../components/Tab/Tab.jsx";

export default function UserForm() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter name" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
    { name: "text", label: "Text", type: "text", placeholder: "Enter something" },
    { name: "amount", label: "Amount", type: "text", placeholder: "Enter amount" }
  ];

  const handleSubmit = (formData) => {
    setOpen(false);
    sessionStorage.setItem("paymentData", JSON.stringify(formData));
    router.push("/payment");
  };

  const [transaction, setTransaction] = useState(null);

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

        {!transaction ? (
          <p className="text-sm text-gray-500 text-center">
            No transactions yet...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border  rounded-lg text-sm">
              
              <thead >
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Text</th>
                  <th className="p-2 border">Amount</th>
                </tr>
              </thead>

              <tbody>
                <tr className="text-center">
                  <td className="p-2 border">{transaction?.name}</td>
                  <td className="p-2 border">{transaction?.email}</td>
                  <td className="p-2 border">{transaction?.text}</td>
                  <td className="p-2 border">₹{transaction?.amount}</td>
                </tr>
              </tbody>

            </table>
          </div>
        )}
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

        <div className="flex justify-end">
          <div className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-800 flex items-center gap-2">
            - Ashish Panwar
          </div>
        </div>

        <Tabs tabs={tabData} />

      </div>

      <CustomForm open={open} setOpen={setOpen} fields={fields} onSubmit={handleSubmit} title="User Form" />

    </div>
  );
}