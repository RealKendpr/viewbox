import { LoadingSpinner } from "@/_components/loading";
import { LoginForm } from "@/app/(auth)/_components/loginForm";
import { Suspense } from "react";

export default function Login() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div>
        <div className="mb-4">
          <p className="text-3xl font-bold">Welcome Back!</p>
          <h1 className="text-2xl">Log In</h1>
        </div>
        <LoginForm></LoginForm>
      </div>
    </Suspense>
  );
}
