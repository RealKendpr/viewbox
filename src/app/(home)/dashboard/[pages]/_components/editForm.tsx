"use client";

import { EditPageType } from "@/types/PageTypes";
import { revalidateForm } from "../_utils/revalidateForm";
import { useAppForm } from "@dashboard/hooks/form-hook";
import dynamic from "next/dynamic";
const InputFields = dynamic(() =>
  import("@dashboard/_components/InputFields").then((mod) => mod.InputFields),
);

export function EditPageForm({
  slug,
  pageValue,
  title,
}: {
  slug: string;
  pageValue: EditPageType;
  title: string;
}) {
  const submitHandler = async (value: EditPageType) => {
    const unchanged = JSON.stringify(pageValue) === JSON.stringify(value);

    if (unchanged) {
      return true;
    }

    const response = await fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "applications/json",
      },
      body: JSON.stringify(value),
    });

    if (!response.ok) {
      return false;
    }

    await revalidateForm(slug);
    return true;
  };

  const form = useAppForm({
    defaultValues: pageValue,
    validators: {
      onSubmitAsync: async ({ value }) => {
        const isSubmitOk = await submitHandler(value);

        if (!isSubmitOk) {
          return {
            formError: "error",
          };
        } else return undefined;
      },
    },
  });

  return (
    <form
      className="grid max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-lg font-medium">{title}</h1>
        <form.AppForm>
          <form.SubmitBtn />
        </form.AppForm>
      </div>
      <InputFields form={form as any} />
    </form>
  );
}
