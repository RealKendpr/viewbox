"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { InputSet } from "@(forms)/_components/inputSet";
import { PageType, LinkType } from "@/types/PageTypes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { getSlug } from "@api/_utils/getSlug";
const AddLink = dynamic(() => import("@(forms)/_components/LinkDisplay"));
const Modal = dynamic(() => import("@/_components/modal"));

export function CreateForm() {
  const router = useRouter();
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [linkRequired, setLinkRequired] = useState<boolean>(false);

  const methods = useForm<PageType>();

  const onSubmit: SubmitHandler<PageType> = async (formData) => {
    const newFormData: PageType = {
      ...formData,
      links: links,
    };

    if (links.length === 0) {
      setLinkRequired(true);
      return;
    }

    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFormData),
    });
    if (!response.ok) {
      if (response.status === 409) {
        setIsDuplicate((isDuplicate) => !isDuplicate);
        return;
      }
      return;
    }

    router.push(`/dashboard/${getSlug(formData.pageName)}/layouts/`);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className="mt-10" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium">Create</h1>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </div>
          <InputSet />
          <AddLink />
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
