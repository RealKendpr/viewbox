"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InputSet } from "../../_components/inputSet";
import { EditPageType, PageType } from "@/types/PageTypes";
import { useState } from "react";
import { deletePage } from "../deletePage";
import { useRouter } from "next/navigation";

export function EditForm({ pageDetails }: { pageDetails: string | null }) {
  const router = useRouter();
  const [isSame, setIsSame] = useState<boolean>(false);

  const pageDetailsResult: EditPageType =
    pageDetails && JSON.parse(pageDetails);

  const formDefaultValues: PageType = {
    pageIcon: pageDetailsResult?.pageIcon,
    pageName: pageDetailsResult?.pageName,
    pageDescription: pageDetailsResult.pageDescription,
    websites: pageDetailsResult?.websites,
  };

  const extendedKeys = {
    _id: pageDetailsResult._id,
    createdAt: pageDetailsResult.createdAt,
  };

  const methods = useForm<PageType>({
    defaultValues: formDefaultValues,
  });

  const onSubmit: SubmitHandler<PageType> = async (formData) => {
    // check if submitted data and current value is the same,
    // before making a proceeding to avoid unnecessary request
    // and show an alert about it
    if (JSON.stringify(formData) === JSON.stringify(formDefaultValues)) {
      setIsSame(true);
      return null;
    }
    setIsSame(false);

    const response = await fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, ...extendedKeys }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result);
    }

    console.log(result);
  };

  return (
    <FormProvider {...methods}>
      <form className="max-w-md" onSubmit={methods.handleSubmit(onSubmit)}>
        <InputSet />
        <button className="btn btn-primary w-full">Update</button>
        <button
          className="btn btn-warning mt-[8.25px] w-full"
          onClick={() => deletePage(extendedKeys._id, router)}
        >
          Delete Page
        </button>
      </form>
    </FormProvider>
  );
}
