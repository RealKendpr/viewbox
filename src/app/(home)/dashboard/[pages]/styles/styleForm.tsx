"use client";

import { useEffect } from "react";
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
  const methods = useForm<StylesType>({ defaultValues: styles || {} });

  const {
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  const linkStyles = {
    linkBackground: styles?.linkBackground || "",
    linkColor: styles?.linkColor || "",
    linkStyle: styles?.linkStyle || "",
  };

  const onSubmit: SubmitHandler<StylesType> = async (formData) => {
    const response = await fetch("/api/update/styles", {
      method: "PUT",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify({ slug: slug, styles: formData }),
    });

    if (!response.ok) {
      return;
    }

    await revalidateForm(`${slug}/styles`);
  };

  useEffect(() => {
    reset(styles || {}, { keepValues: true });
  }, [reset, isSubmitSuccessful]);

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
          <CardBackground currentStyle={styles?.cardColor || ""} />
          <LinkStyle currentStyle={linkStyles} />
        </div>
      </form>
    </FormProvider>
  );
}
