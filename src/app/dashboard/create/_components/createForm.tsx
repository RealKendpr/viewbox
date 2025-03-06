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
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Create your links page</legend>
          <Input label="Page Title" name="page-title" />
          <Input label="Icon External Link" name="page-icon" />
        </fieldset>

        <AddLinks />

        <button className="btn">Create</button>
      </form>
    </FormProvider>
  );
}
