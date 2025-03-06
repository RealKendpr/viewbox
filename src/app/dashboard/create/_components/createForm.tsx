"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Input } from "./input";
import { AddLinks } from "./addLinks";

interface PageType {
  name: string;
  pageIcon: string;
  links: [
    {
      title: string;
      href: string;
      icon: string;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}

export function CreateForm() {
  const methods = useForm<PageType>({
    defaultValues: {
      links: [{}]
    }
  });

  const onSubmit: SubmitHandler<PageType> = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form className="max-w-md" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid gap-y-4">
          <Input label="Page Title" name="page-title" />
          <Input label="Icon External Link" name="page-icon" />
        </div>

        <fieldset className="fieldset my-2">
          <legend className="fieldset-legend">Links</legend>
          <AddLinks />
        </fieldset>

        <button className="btn btn-primary w-full">Create</button>
      </form>
    </FormProvider>
  );
}
