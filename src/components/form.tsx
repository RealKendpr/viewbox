"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Inputs } from "./input";
import { useActionState } from "react";
import { authenticate } from "../app/lib/actions";
import { useSearchParams } from "next/navigation";

interface Inputs {
  username: string;
}

export function Form() {
  const methods = useForm<Inputs>();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    // <FormProvider {...methods}>
    //   <form action={formAction} onSubmit={methods.handleSubmit(onSubmit)}>
    //     <Inputs name="email" label="Username" placeholder="Username"></Inputs>
    //     <Inputs name="password" label="Password"></Inputs>
    //     <input type="hidden" name="redirectTo" value={callbackUrl} />
    //     <button type="submit" aria-disabled={isPending}>
    //       Submit
    //     </button>
    //     {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    //   </form>
    // </FormProvider>

    <form action={formAction}>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        id="email"
        type="email"
        name="email"
        placeholder="Enter your email address"
        required
      />
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        id="password"
        type="password"
        name="password"
        placeholder="Enter password"
        required
        minLength={6}
      />
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <button className="mt-4 w-full" aria-disabled={isPending}>
        Log in
      </button>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </form>
  );
}
