import { Form } from "@/components/form";
import { Suspense } from "react";

export default function Login() {
  return (
    <div>
      <Suspense>
        <Form formType="login"></Form>
      </Suspense>
    </div>
  );
}
