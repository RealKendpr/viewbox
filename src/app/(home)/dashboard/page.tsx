import { Suspense } from "react";
import { PagePreview } from "./_components/pagePreview";
import { LoadingSpinner } from "@/_components/loading";

export default function Dashboard() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="md:px-[4%]">
        <PagePreview />
      </div>
    </Suspense>
  );
}
