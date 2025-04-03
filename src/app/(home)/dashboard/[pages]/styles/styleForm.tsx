"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SubmitBtn } from "../../_components/saveButton";
import { StylesType } from "@/types/PageTypes";
import dynamic from "next/dynamic";
import { revalidateForm } from "../_utils/revalidateForm";
const BackgroundSelector = dynamic(() =>
  import("./colorSelector").then((mod) => mod.ColorSelector),
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
        ...styles,
        ...formData,
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

    revalidateForm(`${slug}/styles`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-lg font-medium capitalize">Styles</h1>
          <SubmitBtn />
        </div>
        <div className="grid gap-y-3">
          <BackgroundSelector
            currentStyle={styles?.background || ""}
            fieldName="background"
            label="Background"
            isOpen={true}
            gradient={true}
          />
          <BackgroundSelector
            currentStyle={styles?.textColor || ""}
            fieldName="textColor"
            label="Text Color"
          />
          <BackgroundSelector
            currentStyle={styles?.cardColor || ""}
            fieldName="cardColor"
            label="Card Color"
            gradient={true}
          />
          <BackgroundSelector
            currentStyle={styles?.linkBackground || ""}
            fieldName="linkBackground"
            label="Link Background"
            gradient={true}
          />
        </div>
      </form>
    </FormProvider>
  );
}
