"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SubmitBtn } from "../../_components/saveButton";
import { StylesType } from "@/types/PageTypes";
import dynamic from "next/dynamic";
const BackgroundSelector = dynamic(() =>
  import("./background").then((mod) => mod.BackgroundSelector),
);

export function StylesForm({
  slug,
  styles,
}: {
  slug: string;
  styles: StylesType | null;
}) {
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
        <BackgroundSelector background={styles?.background || ""} />
      </form>
    </FormProvider>
  );
}
