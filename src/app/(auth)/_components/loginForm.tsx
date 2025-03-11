"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Inputs } from "./input";
import { startTransition, useActionState } from "react";
import { login } from "@/app/(auth)/actions";
import FormOperations from "./formOperations";
import { FormUserType } from "@/types/UserTypes";

export function LoginForm() {
  const methods = useForm<FormUserType>();

  const [state, loginAction] = useActionState(login, undefined);

  const onSubmit: SubmitHandler<FormUserType> = async (
    formData: FormUserType,
  ) => {
    startTransition(() => {
      loginAction(formData);
    });
  };

  return (
    <FormProvider {...methods}>
      <form className="" onSubmit={methods.handleSubmit(onSubmit)}>
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
        <FormOperations submitBtn="Log In" type="login" />
      </form>
    </FormProvider>
  );
}
