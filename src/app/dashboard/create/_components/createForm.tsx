"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { getPathname } from "../_utils/getPathname";
import { InputSet } from "../../_components/inputSet";
import { FormPageType } from "@/types/PageTypes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitBtn } from "../../_components/submitBtns";

export function CreateForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<FormPageType>({
    defaultValues: {
      websites: [{}],
    },
  });

  const onSubmit: SubmitHandler<FormPageType> = async (formData) => {
    setLoading(true);
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Pathname": await getPathname(),
      },
      body: JSON.stringify(formData),
    });

    // const result = await response.json();

    if (!response.ok) {
      return;
    }
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <FormProvider {...methods}>
      <form className="max-w-md" onSubmit={methods.handleSubmit(onSubmit)}>
        <InputSet />
        <SubmitBtn loading={loading} name="Create" />
      </form>
    </FormProvider>
  );
}
