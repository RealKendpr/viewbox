"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Inputs } from "./input";
import { startTransition, useActionState } from "react";
import { login } from "@/app/(auth)/actions";
import { useFormStatus } from "react-dom";
export interface UserType {
  username: string;
  password: string;
}

export function Form() {
  const methods = useForm<UserType>();

  const [state, loginAction] = useActionState(login, undefined);

  const onSubmit: SubmitHandler<UserType> = async (formData: UserType) => {
    startTransition(() => {
      loginAction(formData);
    });
  };

  return (
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
        <SubmitBtn />
      </form>
    </FormProvider>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button className="btn" disabled={pending} type="submit">
      Log In
    </button>
  );
}
