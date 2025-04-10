"use client";

import { PageType } from "@/types/PageTypes";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAppForm } from "@dashboard/hooks/form-hook";
const InputFields = dynamic(() =>
  import("@dashboard/_components/InputFields").then((mod) => mod.InputFields),
);

export function CreateForm() {
  const router = useRouter();

  const submitHandler = async (
    value: PageType,
  ): Promise<string | undefined> => {
    if (!value.links) {
      return "⚠️ At least one link is required";
    }

    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
      },
      body: JSON.stringify(value),
    });

    if (!response.ok) {
      if (response.status === 409) {
        return "Page name already exist.";
      }
      return "";
    }

    router.push(`/dashboard/${value.pageName}/layouts/`);
  };

  const form = useAppForm({
    defaultValues: {} as PageType,
    validators: {
      onSubmitAsync: async ({ value }) => {
        const submit = await submitHandler(value);

        return submit;
      },
    },
  });

  return (
    <form
      className="mt-10 grid max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-lg font-medium">Create</h1>
        <form.AppForm>
          <form.SubmitBtn label="Create" />
        </form.AppForm>
      </div>

      <InputFields form={form as any} />
    </form>
  );
}
