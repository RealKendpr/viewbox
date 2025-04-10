"use client";

import { EditPageType } from "@/types/PageTypes";
// import dynamic from "next/dynamic";
import { SubmitBtn } from "./saveButton";
import { revalidateForm } from "../[pages]/_utils/revalidateForm";
import { createFormHook } from "@tanstack/react-form";
import { Input } from "../create/_components/input";
import { fieldContext, formContext } from "../hooks/form-context";

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Input,
  },
  formComponents: {
    SubmitBtn,
  },
});

export function PageForm({
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
    defaultValues: pageValue as EditPageType,
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
      <div className="grid gap-y-4">
        <div className="fieldset">
          <label htmlFor="avatar" className="fieldset-legend place-self-start">
            Pick an Avatar
          </label>
          <input type="file" id="avatar" className="file-input w-full" />
          <p className="fieldset-label">Max size 2MB</p>
        </div>
        <form.AppField
          name="pageName"
          validators={{
            onSubmit: ({ value }) =>
              !value ? "Page name is required." : undefined,
          }}
          children={(field) => (
            <field.Input name="pageName" label="Page Title" />
          )}
        />
        <div className="fieldset">
          <label
            htmlFor="pageDescription"
            className="fieldset-legend place-self-start"
          >
            Your bio
          </label>
          <form.Field
            name="pageDescription"
            children={(field: any) => (
              <textarea
                className="textarea h-11 w-full"
                placeholder="Bio"
                id="pageDescription"
                defaultValue={field.state.value}
                maxLength={100}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <div className="fieldset-label">Optional</div>
        </div>
      </div>
    </form>
  );
}
