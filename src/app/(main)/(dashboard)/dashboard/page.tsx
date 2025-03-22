import { Suspense } from "react";
import { PagePreview } from "../../dashboard/_components/pagePreview";
import { LoadingSpinner } from "@/_components/loading";

export default function Dashboard() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PagePreview />
    </Suspense>
  );
}
