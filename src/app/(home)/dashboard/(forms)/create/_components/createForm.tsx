"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { InputSet } from "@(forms)/_components/inputSet";
import { PageType } from "@/types/PageTypes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { getSlug } from "@api/_utils/getSlug";
import { FormState } from "@(forms)/_components/formState";
const AddLink = dynamic(() => import("@(forms)/_components/LinkDisplay"));
const Modal = dynamic(() => import("@/_components/modal"));

export function CreateForm() {
  const router = useRouter();
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const methods = useForm<PageType>();

  const onSubmit: SubmitHandler<PageType> = async (data) => {
    if (data.links.length === 0) {
      methods.setError("root", {
        type: "server",
        message: "⚠️ At least one link is required",
      });
      return;
    }

    const formData = new FormData();
    formData.append("pageIcon", data.pageIcon);
    formData.append("pageName", data.pageName);
    formData.append("pageDescription", data.pageDescription || "");
    formData.append("links", JSON.stringify(data.links));

    const response = await fetch("/api/create", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      if (response.status === 409) {
        setIsDuplicate((isDuplicate) => !isDuplicate);
        return;
      }

      methods.setError("root", {
        type: "server",
        message: `Something went wrong, code ${response.status}`,
      });
      return;
    }

    router.push(`/dashboard/${getSlug(data.pageName)}/layouts/`);
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
