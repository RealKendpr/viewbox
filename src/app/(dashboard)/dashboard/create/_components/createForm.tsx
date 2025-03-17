"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { InputSet } from "@dashboard/_components/inputSet";
import { PageType, WebsiteType } from "@/types/PageTypes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitBtn } from "@dashboard/_components/submitBtns";
import dynamic from "next/dynamic";
const AddWebsite = dynamic(() => import("@dashboard/_components/addWebsite"));
const Modal = dynamic(() => import("@/_components/modal"));

export function CreateForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [website, setWebsite] = useState<WebsiteType[]>([]);

  const methods = useForm<PageType>();

  const onSubmit: SubmitHandler<PageType> = async (formData) => {
    setLoading(true);

    const newFormData: PageType = {
      ...formData,
      websites: website,
    };

    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFormData),
    });
    if (!response.ok) {
      if (response.status === 400) {
        setLoading(false);
        setIsDuplicate((isDuplicate) => !isDuplicate);
      }
      return;
    }
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <>
      {isDuplicate && (
        <Modal
          title="⚠️ Page already exist"
          message=" The name of the page your trying to craete already exist, you may
    choose a different name."
          isOpen={isDuplicate}
          setIsOpen={setIsDuplicate}
        />
      )}
      <FormProvider {...methods}>
        <form className="max-w-md" onSubmit={methods.handleSubmit(onSubmit)}>
          <InputSet />
          <AddWebsite
            website={website}
            setWebsite={setWebsite}
            methods={methods}
          />
          <SubmitBtn loading={loading} name="Create" />
        </form>
      </FormProvider>
    </>
  );
}
