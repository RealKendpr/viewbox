import { LoadingSpinner } from "@/_components/loadingComponents";
import { LoginForm } from "@/app/(home)/(auth)/_components/loginForm";
import { Suspense } from "react";

export default function Login() {
  return (
    <div className="w-full max-w-md">
      <Suspense fallback={<LoadingSpinner />}>
        <div className="mb-4">
          <p className="text-3xl font-bold">Welcome Back!</p>
          <h1 className="text-2xl">Log In</h1>
        </div>
        <LoginForm></LoginForm>
      </Suspense>
    </div>
  );
}
