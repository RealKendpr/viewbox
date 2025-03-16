import { LoadingSpinner } from "@/_components/loading";
import { RegisterForm } from "@/app/(dashboard)/(auth)/_components/registerForm";
import { Suspense } from "react";

export default function Register() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div>
        <h1 className="mb-4 text-3xl font-bold">Create an Account</h1>
        <RegisterForm />
      </div>
    </Suspense>
  );
}
