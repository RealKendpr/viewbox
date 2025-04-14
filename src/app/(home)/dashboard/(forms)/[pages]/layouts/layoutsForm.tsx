"use client";

import layouts from "@/layouts/layouts.json";
import { revalidateForm } from "../_utils/revalidateForm";
import { FormHeader } from "@/app/(home)/dashboard/(forms)/_components/formHeader";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { LayoutsType } from "@/types/PageTypes";

export function LayoutsForm({
  slug,
  activeLayout,
}: {
  slug: string;
  activeLayout: string | null;
}) {
  const methods = useForm<LayoutsType>();
  const { register } = methods;

  const onSubmit: SubmitHandler<LayoutsType> = async (formData) => {
    if (formData.activeLayout === activeLayout) {
      return;
    }

    const formValues = {
      slug: slug,
      active: formData.activeLayout,
    };

    const response = await fetch("/api/update/layouts", {
      method: "PATCH",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      methods.setError("root", {
        type: `{server', message:'Something is wrong with your request; status code: ${response.status}}`,
      });
      return;
    }
    revalidateForm(`/dashboard${slug}/layouts`);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormHeader slug={slug} title="Layouts" />
          <div>
            {layouts.layouts?.map((i) => (
              <label
                htmlFor={i}
                className="bg-base-200 card card-sm mb-4 cursor-pointer shadow-sm"
                key={i}
              >
                <div className="card-body flex-row items-center justify-between">
                  <span className="card-title capitalize">{i}</span>
                  <input
                    className="radio radio-sm"
                    {...register("activeLayout")}
                    type="radio"
                    id={i}
                    value={i}
                    defaultChecked={
                      activeLayout ? i === activeLayout : i === "default"
                    }
                  />
                </div>
              </label>
            ))}
          </div>
        </form>
      </FormProvider>
    </>
  );
}
