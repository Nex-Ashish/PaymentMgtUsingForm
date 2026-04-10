import { Suspense } from "react";
import TransactionData from "../../../../../components/common/Submission/TransactionData";

export default function Transactions() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionData />
    </Suspense>
  );
}