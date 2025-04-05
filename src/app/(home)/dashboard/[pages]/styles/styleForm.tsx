"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SubmitBtn } from "../../_components/saveButton";
import { StylesType } from "@/types/PageTypes";
import { revalidateForm } from "../_utils/revalidateForm";
import {
  Background,
  CardBackground,
  LinkStyle,
  TextColor,
} from "./_components/styleSelector";

export function StylesForm({
  slug,
  styles,
}: {
  slug: string;
  styles: StylesType | null;
}) {
  const methods = useForm<StylesType>();

  const linkStyles = {
    linkBackground: styles?.linkBackground || "",
    linkColor: styles?.linkColor || "",
    linkBorder: styles?.linkBorder || "",
  };

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
          <Background currentStyle={styles?.background || ""} />
          <TextColor currentStyle={styles?.textColor || ""} />
          <CardBackground currentStyle={styles?.textColor || ""} />
          <LinkStyle currentStyle={linkStyles} />
        </div>
      </form>
    </FormProvider>
  );
}
