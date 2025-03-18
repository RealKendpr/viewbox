"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InputSet } from "../../_components/inputSet";
import { EditPageType, PageType, WebsiteType } from "@/types/PageTypes";
import { useState } from "react";
import { deletePage } from "../deletePage";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const AddWebsite = dynamic(() => import("@dashboard/_components/addWebsite"));

export function EditForm({ pageDetails }: { pageDetails: string | null }) {
  const pageDetailsResult: EditPageType =
    pageDetails && JSON.parse(pageDetails);

  const extendedKeys = {
    _id: pageDetailsResult._id,
    createdAt: pageDetailsResult.createdAt,
  };
  const formDefaultValues = {
    pageIcon: pageDetailsResult?.pageIcon,
    pageName: pageDetailsResult?.pageName,
    pageDescription: pageDetailsResult.pageDescription,
  }; // websites must be handled by a useState,
  // because it was not exclusively a part of the form when data
  // was created/submitted to server
  const [website, setWebsite] = useState<WebsiteType[]>(
    pageDetailsResult.websites,
  );

  const router = useRouter();
  const [isSame, setIsSame] = useState<boolean>(false);

  const methods = useForm<PageType>({
    defaultValues: formDefaultValues,
  });

  const onSubmit: SubmitHandler<PageType> = async (formData) => {
    const newFormData: PageType = {
      ...formData,
      websites: website,
    };

    // check if submitted data and current value is the same,
    // before proceeding to avoid unnecessary request
    // and show an alert about it
    if (
      JSON.stringify(newFormData) ===
      JSON.stringify({
        ...formDefaultValues,
        websites: pageDetailsResult.websites,
      })
    ) {
      setIsSame(true);
      return;
    }
    setIsSame(false);

    const response = await fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newFormData, ...extendedKeys }),
    });

    if (!response.ok) {
      return;
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="max-w-md" onSubmit={methods.handleSubmit(onSubmit)}>
        <InputSet />
        <AddWebsite
          website={website}
          setWebsite={setWebsite}
          methods={methods}
        />
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
