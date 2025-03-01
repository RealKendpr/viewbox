"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Inputs } from "./input";
import { startTransition, useActionState } from "react";
import { authenticate, Register } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
export interface UserType {
  username: string;
  password: string;
}

export function Form({ formType }: { formType: "register" | "login" }) {
  const methods = useForm<UserType>();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const onSubmit: SubmitHandler<UserType> = async (data: UserType) => {
    if (formType === "login") {
      startTransition(() => {
        formAction(data);
      });
    } else if (formType === "register") {
      Register(data);
    }
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
        {formType === "login" && (
          <input type="hidden" name="redirectTo" value={callbackUrl} />
        )}
        <button className="btn" type="submit" aria-disabled={isPending}>
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
