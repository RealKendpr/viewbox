"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Inputs } from "./input";
import { startTransition, useActionState, useEffect, useState } from "react";
import { login } from "@/app/(main)/(dashboard)/(auth)/actions";
import FormOperations from "./formOperations";
import { FormUserType } from "@/types/UserTypes";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("@/_components/modal"));

export function LoginForm() {
  const methods = useForm<FormUserType>();
  const [isError, setIsError] = useState<boolean>(false);
  const [state, loginAction] = useActionState(login, undefined);

  const onSubmit: SubmitHandler<FormUserType> = async (
    formData: FormUserType,
  ) => {
    startTransition(() => {
      loginAction(formData);
    });
  };

  useEffect(() => {
    if (state?.errors.username) setIsError(true);
    else setIsError(false);
  }, [state?.errors.username]);

  return (
    <>
      {isError && state?.errors.username && (
        <Modal isOpen={isError} setIsOpen={setIsError}>
          <h3 className="text-lg font-bold">Log-in failed</h3>
          <p className="py-4">{state?.errors.username}</p>
        </Modal>
      )}
      <FormProvider {...methods}>
        <form className="" onSubmit={methods.handleSubmit(onSubmit)}>
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
            // pattern={/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/}
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
          <FormOperations submitBtn="Log In" type="login" />
        </form>
      </FormProvider>
    </>
  );
}
