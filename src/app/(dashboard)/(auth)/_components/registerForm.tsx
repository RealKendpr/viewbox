"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Inputs } from "./input";
import { register } from "@/app/(dashboard)/(auth)/actions";
import { useState } from "react";
import Link from "next/link";
import FormOperations from "./formOperations";
import { FormUserType } from "@/types/UserTypes";

export function RegisterForm() {
  const methods = useForm<FormUserType>();

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormUserType> = async (
    formData: FormUserType,
  ) => {
    const registerAction = await register(formData);

    if (registerAction?.status === "success") {
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
          />
          <Inputs
            name="password"
            label="Password"
            placeholder="Password"
            pattern={/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/}
            type="password"
            minL={8}
          />
          <p className="validator-hint">
            Must be more than 8 characters, including
            <br />
            At least one number
            <br />
            At least one lowercase letter
            <br />
            At least one uppercase letter
          </p>
          <FormOperations submitBtn="Create" type="register" />
        </form>
      </FormProvider>
    </>
  );
}
