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
  styles,
}: {
  slug: string;
  styles: StylesType | null;
}) {
  const methods = useForm<StylesType>({ defaultValues: styles || {} });

  const { reset, setError } = methods;

  const linkStyles: LinkStyleType = {
    linkBackground: styles?.linkBackground || "",
    linkColor: styles?.linkColor || "",
    linkStyle: styles?.linkStyle || "",
  };

  const onSubmit: SubmitHandler<StylesType> = async (formData) => {
    if (JSON.stringify(styles) == JSON.stringify(formData)) return;

    const response = await fetch("/api/update/styles", {
      method: "PATCH",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify({ slug: slug, styles: formData }),
    });

    if (!response.ok) {
      setError("root", {
        type: `{server', message:'Something is wrong with your request; status code: ${response.status}}`,
      });
      return;
    }

    await revalidateForm(`${slug}/styles`);
  };

  useEffect(() => {
    reset(styles || {}, { keepValues: true, keepIsSubmitted: true });
  }, [reset, styles]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormHeader slug={slug} title="Styles" />
        <div className="grid gap-y-3">
          <Background currentStyle={styles?.background || ""} />
          <TextColor currentStyle={styles?.textColor || ""} />
          <CardBackground currentStyle={styles?.cardColor || ""} />
          <LinkStyle currentStyle={linkStyles} />
        </div>
      </form>
      <FormState />
    </FormProvider>
  );
}
