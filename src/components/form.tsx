"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Inputs } from "./input";
import { startTransition, useActionState } from "react";
import { authenticate } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
export interface UserType {
  username: string;
  password: string;
}

export function Form() {
  const methods = useForm<UserType>();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const onSubmit: SubmitHandler<UserType> = async (data: UserType) => {
    startTransition(() => {
      formAction(data);
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
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button className="btn" type="submit" aria-disabled={isPending}>
          Submit
        </button>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </form>
    </FormProvider>
  );
}
