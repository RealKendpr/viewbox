import { RegisterForm } from "@/app/(auth)/_components/registerForm";
import { Suspense } from "react";

export default function Register() {
  return (
    <Suspense fallback={"Loading..."}>
      <div>
        <div>
          <h1 className="text-3xl font-bold mb-4">Create an Account</h1>
        </div>
        <RegisterForm />
      </div>
    </Suspense>
  );
}
