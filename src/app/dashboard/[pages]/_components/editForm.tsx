"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InputSet } from "../../_components/inputSet";
import { EditPageType, FormPageType } from "@/types/PageTypes";
import { useState } from "react";
import { getPathname } from "../../create/_utils/getPathname";

export function EditForm({ pageDetails }: { pageDetails: string | null }) {
  const pageDetailsResult: EditPageType =
    pageDetails && JSON.parse(pageDetails);

  const formDefaultValues: FormPageType = {
    pageName: pageDetailsResult?.pageName,
    pageIcon: pageDetailsResult?.pageIcon,
    websites: pageDetailsResult?.websites,
  };

  const methods = useForm<FormPageType>({
    defaultValues: formDefaultValues,
  });

  const [isSame, setIsSame] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormPageType> = async (formData) => {
    // check if submitted data and current value is the same,
    // before making a proceeding to avoid unnecessary request
    // and show an alert about it
    if (JSON.stringify(formData) === JSON.stringify(formDefaultValues)) {
      setIsSame(true);
      return null;
    }
    setIsSame(false);

    const extendedKeys = {
      _id: pageDetailsResult._id,
      createdAt: pageDetailsResult.createdAt,
    };

    const response = await fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Pathname": await getPathname(),
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
      </form>
    </FormProvider>
  );
}
