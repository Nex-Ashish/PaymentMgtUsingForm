import { Suspense } from "react";
import FormSubmissionData from "../../../../../components/common/Submission/FormSubmissionData";

export default function FormSubmissions() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormSubmissionData />
    </Suspense>
  );
}