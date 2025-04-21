import { Suspense } from "react";
import { CreateForm } from "./_components/createForm";
import { LoadingSpinner } from "@/_components/loadingComponents";

export default function CreatePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="mx-[4%] max-w-md min-[28rem]:mx-auto">
        <CreateForm />
      </div>
    </Suspense>
  );
}
