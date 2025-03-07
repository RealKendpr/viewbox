"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Input } from "./input";
import { AddWebsite } from "./addWebsite";
import AccordionContextProvider from "../_context/accordionContext";

interface PageType {
  pageName: string;
  pageIcon: string;
  websites: [
    {
      webName: string;
      webUrl: string;
      webIcon?: string;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}

export function CreateForm() {
  const methods = useForm<PageType>({
    defaultValues: {
      websites: [{}]
    }
  });

  const onSubmit: SubmitHandler<PageType> = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form className="max-w-md" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid gap-y-4">
          <Input
            label="Page Title"
            name="pageName"
            placeholder="Awesome Delight"
            required={true}
          />
          <Input
            label="External icon URL"
            name="pageIcon"
            placeholder="https://icons.com/icon"
            type="url"
          />
        </div>

        <fieldset className="fieldset my-2">
          <legend className="fieldset-legend">Websites</legend>
          <AccordionContextProvider>
            <AddWebsite />
          </AccordionContextProvider>
        </fieldset>

        <button className="btn btn-primary w-full">Create</button>
      </form>
    </FormProvider>
  );
}
