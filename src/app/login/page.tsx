import { Form } from "@/components/form";
import { Suspense } from "react";

export default function Login() {
  return (
    <div>
      <Suspense>
        <Form></Form>
      </Suspense>
    </div>
  );
}
