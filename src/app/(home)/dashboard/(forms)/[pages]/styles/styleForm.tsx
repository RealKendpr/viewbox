"use client";

import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormHeader } from "@/app/(home)/dashboard/(forms)/_components/formHeader";
import { LinkStyleType, StylesType } from "@/types/PageTypes";
import { revalidateForm } from "../_utils/revalidateForm";
import { FormState } from "@(forms)/_components/formState";
import {
  Background,
  CardBackground,
  LinkStyle,
  TextColor,
} from "./_components/styleSelector";

export function StylesForm({
  slug,
  currentStyles,
}: {
  slug: string;
  currentStyles: StylesType | null;
}) {
  const methods = useForm<StylesType>({ defaultValues: currentStyles || {} });

  const { reset, setError } = methods;

  const linkStyles: LinkStyleType = {
    linkBackground: currentStyles?.linkBackground || "",
    linkColor: currentStyles?.linkColor || "",
    linkStyle: currentStyles?.linkStyle || "",
  };

  const onSubmit: SubmitHandler<StylesType> = async (formData) => {
    if (JSON.stringify(currentStyles) == JSON.stringify(formData)) return;

    const response = await fetch("/api/update/styles", {
      method: "PATCH",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify({ slug: slug, styles: formData }),
    });

    if (!response.ok) {
      setError("root", {
        type: "server",
        message: `Something went wrong, code ${response.status}`,
      });
      return;
    }

    await revalidateForm(`${slug}/styles`);
  };

  useEffect(() => {
    reset(currentStyles || {}, { keepValues: true, keepIsSubmitted: true });
  }, [reset, currentStyles]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormHeader slug={slug} title="Styles" />
        <div className="grid gap-y-3">
          <Background currentStyle={currentStyles?.background || ""} />
          <TextColor currentStyle={currentStyles?.textColor || ""} />
          <CardBackground currentStyle={currentStyles?.cardColor || ""} />
          <LinkStyle currentStyle={linkStyles} />
        </div>
      </form>
      <FormState />
    </FormProvider>
  );
}
