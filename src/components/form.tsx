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
        ></Inputs>
        <Inputs name="password" label="Password"></Inputs>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button type="submit" aria-disabled={isPending}>
          Submit
        </button>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </form>
    </FormProvider>
  );
}
