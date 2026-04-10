import { Suspense } from "react";
import FormSubmissionData from "../../../../../components/Submission/FormSubmissionData";

export default function FormSubmissions() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormSubmissionData />
    </Suspense>
  );
}