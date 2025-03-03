import { Form } from "@/app/(auth)/_components/loginForm";
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
