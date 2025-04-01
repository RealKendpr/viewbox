"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { BackgroundSelector } from "./background";
import { SubmitBtn } from "../../_components/saveButton";
import { StylesType } from "@/types/PageTypes";

export function StylesForm({ slug }: { slug: string }) {
  const methods = useForm<StylesType>();

  const onSubmit: SubmitHandler<StylesType> = async (formData) => {
    const formValues = {
      slug: slug,
      styles: {
        background: formData.background,
      },
    };

    const response = await fetch("/api/update/styles", {
      method: "PUT",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      return;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-lg font-medium capitalize">Styles</h1>
          <SubmitBtn />
        </div>
        <BackgroundSelector />
      </form>
    </FormProvider>
  );
}
