"use client";

import { revalidateForm } from "../_utils/revalidateForm";
import { OptionsType } from "@/types/PageTypes";
import dynamic from "next/dynamic";
import { FormHeader } from "@/app/(home)/dashboard/(forms)/_components/formHeader";
import { FormState } from "@(forms)/_components/formState";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
const DeletePageBtn = dynamic(() =>
  import("./delete").then((mod) => mod.DeleteBtn),
);

export default function OptionsForm({
  slug,
  currentOptions,
}: {
  slug: string;
  currentOptions: OptionsType | null;
}) {
  const methods = useForm<OptionsType>({
    defaultValues: currentOptions || undefined,
  });
  const { register } = methods;

  const onSubmit: SubmitHandler<OptionsType> = async (formData) => {
    const formValues = {
      newTab: formData.newTab,
    };

    if (JSON.stringify(currentOptions) === JSON.stringify(formValues)) {
      return;
    }

    const response = await fetch("/api/update/options", {
      method: "PATCH",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify({ slug: slug, ...formValues }),
    });

    if (!response.ok) {
      methods.setError("root", {
        type: `{server', message:'Something is wrong with your request; status code: ${response.status}}`,
      });
      return;
    }

    await revalidateForm(`${slug}/options`);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormHeader slug={slug} title="Options" />
          <div className="flex justify-between">
            <label className="label" htmlFor="newTab">
              Open links in new tab?
            </label>
            <input
              id="newTab"
              {...register("newTab")}
              type="checkbox"
              defaultChecked={currentOptions?.newTab}
              className="checkbox"
            />
          </div>
        </form>
        <FormState />
      </FormProvider>
      <div className="mt-28">
        <h2 className="mb-3 text-lg font-medium">Advanced</h2>
        <DeletePageBtn pageSlug={slug} />
      </div>
    </>
  );
}
