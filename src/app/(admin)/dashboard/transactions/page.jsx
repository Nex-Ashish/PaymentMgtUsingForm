import { Suspense } from "react";
import TransactionData from "../../../../../components/common/Submission/TransactionData";
import Sidebar from "../../../../../components/layout/Sidebar/Sidebar";

export default function Transactions() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-[calc(100vh-68px)] flex bg-gray-300 overflow-hidden">
        <Sidebar />

        <div className="overflow-y-auto flex-1">
          <TransactionData />
        </div>
      </div>
    </Suspense>
  );
}