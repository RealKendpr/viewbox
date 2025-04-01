"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InputSet } from "../../_components/inputSet";
import { EditPageType, PageType, LinkType } from "@/types/PageTypes";
import { useState } from "react";
import dynamic from "next/dynamic";
import { SubmitBtn } from "../../_components/saveButton";
import { revalidateForm } from "../_utils/revalidateForm";

const AddLink = dynamic(
  () => import("@/app/(home)/dashboard/_components/addLink"),
);
const Modal = dynamic(() => import("@/_components/modal"));

export function EditForm({ pageDetails }: { pageDetails: EditPageType }) {
  const extendedKeys = {
    _id: pageDetails._id,
    createdAt: pageDetails.createdAt,
  };
  const formDefaultValues = {
    pageIcon: pageDetails?.pageIcon,
    pageName: pageDetails?.pageName,
    pageDescription: pageDetails.pageDescription,
  }; // links must be handled by a useState,
  // because it was not exclusively a part of the form when data
  // was created/submitted to server
  const [links, setLinks] = useState<LinkType[]>(pageDetails.links);

  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [linkRequired, setLinkRequired] = useState<boolean>(false);

  const methods = useForm<PageType>({
    defaultValues: formDefaultValues,
  });

  const onSubmit: SubmitHandler<PageType> = async (formData) => {
    const newFormData: PageType = {
      ...formData,
      links: links,
    };

    // check if submitted data and current value is the same,
    // before proceeding to avoid unnecessary request
    // and show an alert about it
    if (
      JSON.stringify(newFormData) ===
      JSON.stringify({
        ...formDefaultValues,
        links: pageDetails.links,
      })
    ) {
      return;
    }

    if (links.length === 0) {
      setLinkRequired(true);
      return;
    }

    const response = await fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newFormData, ...extendedKeys }),
    });

    if (!response.ok) {
      if (response.status === 409) {
        setIsDuplicate(true);
        return;
      }
      return;
    }
    // should revalidate the pageDetails, so, that on 2nd attempt of update with no changes a promt should popup
    revalidateForm(formDefaultValues.pageName);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="grid max-w-md"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-lg font-medium">Edit</h1>
            <SubmitBtn />
          </div>
          <InputSet />
          <AddLink links={links} setLinks={setLinks} />
        </form>
      </FormProvider>
      <Modal isOpen={linkRequired} setIsOpen={setLinkRequired}>
        <p>⚠️ At least one link is required</p>
      </Modal>
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
