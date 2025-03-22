import { LoadingSpinner } from "@/_components/loading";
import { RegisterForm } from "@/app/(main)/(dashboard)/(auth)/_components/registerForm";
import { Suspense } from "react";

export default function Register() {
  return (
    <div className="w-full max-w-md">
      <Suspense fallback={<LoadingSpinner />}>
        <div>
          <div className="mb-4">
            <p className="text-3xl font-bold">Welcome!</p>
            <h1 className="text-2xl">Create an account</h1>
          </div>
          <RegisterForm />
        </div>
      </Suspense>
    </div>
  );
}
