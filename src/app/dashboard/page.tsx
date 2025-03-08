import { Suspense } from "react";
import { PageTable } from "./_components/pageTable";
import { LoadingSpinner } from "@/_components/loading";

export default function Dashboard() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PageTable />
    </Suspense>
  );
}
