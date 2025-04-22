"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { InputSet } from "@(forms)/_components/inputSet";
import { PageType } from "@/types/PageTypes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { getSlug } from "@api/_utils/getSlug";
import FormError from "./formError";
const AddLink = dynamic(() => import("@(forms)/_components/LinkDisplay"));
const Modal = dynamic(() => import("@/_components/modal"));

export function CreateForm() {
  const router = useRouter();
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const methods = useForm<PageType>();
  const { setError } = methods;

  const onSubmit: SubmitHandler<PageType> = async (data) => {
    if (data.links.length === 0) {
      setError("root", {
        type: "server",
        message: "⚠️ At least one link is required",
      });
      return;
    }

    const pageIcon = () => {
      if (data.pageIcon instanceof File) {
        return data.pageIcon;
      }
      return "";
    };

    const formData = new FormData();
    formData.append("pageIcon", pageIcon());
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

      setError("root", {
        type: "server",
        message: `Something went wrong. Code ${response.status}`,
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
              {methods.formState.isSubmitting ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V4.70711L9.29289 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H9.5C9.63261 1 9.75979 1.05268 9.85355 1.14645L12.7803 4.07322C12.921 4.21388 13 4.40464 13 4.60355V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5ZM4.75 7.5C4.75 7.22386 4.97386 7 5.25 7H7V5.25C7 4.97386 7.22386 4.75 7.5 4.75C7.77614 4.75 8 4.97386 8 5.25V7H9.75C10.0261 7 10.25 7.22386 10.25 7.5C10.25 7.77614 10.0261 8 9.75 8H8V9.75C8 10.0261 7.77614 10.25 7.5 10.25C7.22386 10.25 7 10.0261 7 9.75V8H5.25C4.97386 8 4.75 7.77614 4.75 7.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
              <span>Create</span>
            </button>
          </div>
          <InputSet />
          <AddLink />
          <FormError />
        </form>
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
