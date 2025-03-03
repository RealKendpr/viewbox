"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Inputs } from "./input";
import { register } from "@/app/(auth)/actions";
import { useState } from "react";
import Link from "next/link";
import FormOperations from "./formOperations";

export interface UserType {
  username: string;
  password: string;
}

export function RegisterForm() {
  const methods = useForm<UserType>();

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const onSubmit: SubmitHandler<UserType> = async (formData: UserType) => {
    const registerAction = await register(formData);

    if (registerAction.status === "success") {
      setShowConfirmation(true);
      methods.reset();
    }
  };
  return (
    <>
      {showConfirmation && (
        <div>
          <Link href="/login">Go to Login</Link>
        </div>
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Inputs
            name="username"
            label="Username"
            placeholder="Username"
            pattern={/[A-Za-z][A-Za-z0-9\-]*/}
            minL={6}
            maxL={24}
          ></Inputs>
          <Inputs
            name="password"
            label="Password"
            placeholder="Password"
            // pattern={/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/}
            type="password"
            minL={6}
          ></Inputs>
          <FormOperations submitBtn="Register" type="register" />
        </form>
      </FormProvider>
    </>
  );
}
