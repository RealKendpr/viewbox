"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InputSet } from "../../_components/inputSet";
import { EditPageType } from "@/types/PageTypes";

export function EditForm({ pageDetails }: { pageDetails: string | null }) {
  const pageDetailsResult: EditPageType =
    pageDetails && JSON.parse(pageDetails);

  const methods = useForm<EditPageType>({
    defaultValues: {
      pageName: pageDetailsResult?.pageName,
      pageIcon: pageDetailsResult?.pageIcon,
      websites: pageDetailsResult?.websites,
    },
  });

  const onSubmit: SubmitHandler<EditPageType> = () => {};

  return (
    <FormProvider {...methods}>
      <form className="max-w-md" onSubmit={methods.handleSubmit(onSubmit)}>
        <InputSet />
        <button className="btn btn-primary w-full">Update</button>
      </form>
    </FormProvider>
  );
}
