"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InputSet } from "../../_components/inputSet";
import { WebsiteType } from "@/_lib/mongodb/models/PageModel";

interface PageDetailsType {
  pageName: string | undefined;
  pageIcon: string | undefined;
  createdAt: Date | undefined;
  websites: WebsiteType[] | undefined;
}

export function EditForm({ pageDetails }: { pageDetails: string | null }) {
  const pageDetailsResult = pageDetails && JSON.parse(pageDetails);

  const methods = useForm<PageDetailsType>({
    defaultValues: {
      pageName: pageDetailsResult?.pageName,
      pageIcon: pageDetailsResult?.pageIcon,
      websites: pageDetailsResult?.websites,
    },
  });

  const onSubmit: SubmitHandler<PageDetailsType> = () => {};

  return (
    <FormProvider {...methods}>
      <form className="max-w-md" onSubmit={methods.handleSubmit(onSubmit)}>
        <InputSet />
        <button className="btn btn-primary w-full">Update</button>
      </form>
    </FormProvider>
  );
}
