"use client";

// import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { EditPageType, PageType, LinkType } from "@/types/PageTypes";
// import { useState } from "react";
import dynamic from "next/dynamic";
// import { SubmitBtn } from "../../_components/saveButton";
// import { revalidateForm } from "../_utils/revalidateForm";
import { createFormHook } from "@tanstack/react-form";
import { Input } from "../create/_components/input";
import { SubmitBtn } from "./saveButton";
import { fieldContext, formContext } from "../hooks/form-context";
import { useState } from "react";

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
  pageValue,
  title,
}: {
  pageValue: EditPageType;
  title: string;
}) {
  const submitHandler = async (value: EditPageType) => {
    const unchanged = JSON.stringify(pageValue) === JSON.stringify(value);

    if (unchanged) {
      return;
    }

    console.log(value);
    return;
  };

  const form = useAppForm({
    defaultValues: pageValue,
    validators: {
      onSubmit: ({ value }) => {
        return {
          fields: {
            pageName: !value.pageName ? "Page name is required" : undefined,
          },
        };
      },
    },
    onSubmit: async ({ value }) => await submitHandler(value),
  });

  return (
    <form
      className="grid max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
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
