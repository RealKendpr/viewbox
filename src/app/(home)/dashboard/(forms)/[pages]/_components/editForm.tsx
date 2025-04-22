"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InputSet } from "@(forms)/_components/inputSet";
import { EditPageType } from "@/types/PageTypes";
import { useState } from "react";
import dynamic from "next/dynamic";
import { FormHeader } from "@(forms)/_components/formHeader";
import { revalidateForm } from "../_utils/revalidateForm";
import { FormState } from "@(forms)/_components/formState";
const LinkDisplay = dynamic(() => import("@(forms)/_components/LinkDisplay"));
const Modal = dynamic(() => import("@/_components/modal"));

export function EditForm({
  pageDetails,
  slug,
}: {
  pageDetails: EditPageType;
  slug: string;
}) {
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const methods = useForm<EditPageType>({
    defaultValues: async () => pageDetails,
  });

  const onSubmit: SubmitHandler<EditPageType> = async (data) => {
    // check if submitted data and current value is the same,
    // before proceeding to avoid unnecessary request
    // and show an alert about it
    const unchanged = JSON.stringify(data) === JSON.stringify(pageDetails);
    if (unchanged) {
      return;
    }

    if (data.links.length === 0) {
      methods.setError("root", {
        type: "server",
        message: "⚠️ At least one link is required",
      });
      return;
    }

    const pageIcon = () => {
      if (data.pageIcon instanceof File) {
        return data.pageIcon;
      }
      return JSON.stringify(data.pageIcon);
    };

    const formData = new FormData();
    formData.append("pageIcon", pageIcon());
    formData.append("pageName", data.pageName);
    formData.append("pageDescription", data.pageDescription || "");
    formData.append("links", JSON.stringify(data.links));
    formData.append("pageId", data.pageId);

    const response = await fetch("/api/update", {
      method: "PATCH",
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 409) {
        setIsDuplicate(true);
        return;
      }

      methods.setError("root", {
        type: "server",
        message: `Something went wrong, code ${response.status}`,
      });
      return;
    }
    // should revalidate the pageDetails, so, that on 2nd attempt of update with no changes a promt should popup
    revalidateForm(data.pageName);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormHeader slug={slug} title="Edit" />
          <InputSet />
          <LinkDisplay />
        </form>
        <FormState />
      </FormProvider>
      <Modal isOpen={isDuplicate} setIsOpen={setIsDuplicate}>
        <p className="font-semibold">⚠️ Page already exist</p>
        <p className="py-4 text-sm">
          The name of the page your trying to create already exist, you may
          choose a different name
        </p>
      </Modal>
    </>
  );
}
