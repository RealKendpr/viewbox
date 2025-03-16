import { Suspense } from "react";
import { CreateForm } from "./_components/createForm";
import { LoadingSpinner } from "@/_components/loading";

export default function CreatePage() {
  return (
    <div className="mx-[4%]">
      <Suspense fallback={<LoadingSpinner />}>
        <CreateForm />
      </Suspense>
    </div>
  );
}
