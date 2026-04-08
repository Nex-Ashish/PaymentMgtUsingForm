"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Payment() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem("paymentData");
    if (data) setPaymentData(JSON.parse(data));
  }, []);

  const handlePaymentSuccess = () => {
    alert(`Payment of ₹${paymentData?.amount} successful!`);
    router.push("/userInfo");
  };

  return (
    <div style={{ minHeight: "100vh" }} className="bg-red-200 flex items-center justify-center p-4">

      <div className="bg-white border border-zinc-200 rounded-2xl p-7 w-full max-w-sm flex flex-col gap-5">

        <div className="text-center border-b border-zinc-100 pb-4">
          <h1 className="text-lg font-semibold text-zinc-900">Payment Summary</h1>
          <p className="text-xs text-zinc-400 mt-1">Review your details before paying</p>
        </div>

        <div className="flex flex-col">
          {[
            { label: "Name", value: paymentData?.name },
            { label: "Email", value: paymentData?.email },
            { label: "Note", value: paymentData?.text },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center py-2.5 border-b border-zinc-50">
              <span className="text-[11px] tracking-wide text-zinc-400">{row?.label}</span>
              <span className="text-sm font-medium text-zinc-800">{row?.value || "—"}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <span className="text-[11px] uppercase tracking-widest text-green-700">Total Amount</span>
          <span className="text-xl font-semibold text-green-700">₹{paymentData?.amount || "0"}</span>
        </div>

        <button
          onClick={handlePaymentSuccess}
          className="w-full cursor-pointer py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 active:scale-[0.98] rounded-lg transition"
        >
          Pay Now
        </button>

      </div>
    </div>
  );
}