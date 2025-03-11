"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { getPathname } from "../_utils/getPathname";
import { InputSet } from "../../_components/inputSet";
import { FormPageType } from "@/types/PageTypes";

export function CreateForm() {
  const methods = useForm<FormPageType>({
    defaultValues: {
      websites: [{}],
    },
  });

  const onSubmit: SubmitHandler<FormPageType> = async (formData) => {
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Pathname": await getPathname(),
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result);
    }

    console.log(result);
  };

  return (
    <FormProvider {...methods}>
      <form className="max-w-md" onSubmit={methods.handleSubmit(onSubmit)}>
        <InputSet />
        <button className="btn btn-primary w-full">Create</button>
      </form>
    </FormProvider>
  );
}
