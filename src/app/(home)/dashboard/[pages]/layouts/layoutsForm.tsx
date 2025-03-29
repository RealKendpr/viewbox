"use client";

import layouts from "@/layouts/layouts.json";
import { revalidateForm } from "../_utils/revalidateForm";
import { SubmitBtn } from "../../_components/saveButton";
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
      method: "PUT",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      return;
    }
    revalidateForm(`/dashboard${slug}/layouts`);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium capitalize">Layouts</h1>
            <SubmitBtn />
          </div>
          <div className="mt-8 flex justify-between">
            {layouts.layouts?.map((i) => (
              <div key={i}>
                <label className="label" htmlFor={i}>
                  {i}
                </label>
                <input
                  className="radio"
                  {...register("activeLayout")}
                  type="radio"
                  id={i}
                  value={i}
                  defaultChecked={
                    activeLayout ? i === activeLayout : i === "default"
                  }
                />
              </div>
            ))}
          </div>
        </form>
      </FormProvider>
    </>
  );
}
