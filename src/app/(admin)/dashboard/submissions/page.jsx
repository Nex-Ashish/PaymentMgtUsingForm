import { Suspense } from "react";
import FormSubmissionData from "../../../../../components/common/Submission/FormSubmissionData";
import Sidebar from "../../../../../components/layout/Sidebar/Sidebar";

export default function FormSubmissions() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-[calc(100vh-68px)] flex bg-gray-300 overflow-hidden">
        <Sidebar />
        <div className="overflow-y-auto flex-1">
          <FormSubmissionData />
        </div>
      </div>
    </Suspense>
  );
}