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
  const [websiteRequired, setWebsiteRequired] = useState<boolean>(false);

  const methods = useForm<PageType>();

  const onSubmit: SubmitHandler<PageType> = async (formData) => {
    const newFormData: PageType = {
      ...formData,
      websites: website,
    };

    if (website.length === 0) {
      setWebsiteRequired(true);
      return;
    }

    setLoading(true);
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFormData),
    });
    if (!response.ok) {
      if (response.status === 409) {
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
      <Modal isOpen={websiteRequired} setIsOpen={setWebsiteRequired}>
        <p>⚠️ At least one link is required</p>
      </Modal>
      <Modal isOpen={isDuplicate} setIsOpen={setIsDuplicate}>
        <h3 className="text-lg font-bold">⚠️ Page already exist</h3>
        <p className="py-4">
          The name of the page your trying to create already exist, you may
          choose a different name
        </p>
      </Modal>
      <FormProvider {...methods}>
        <form
          className="grid max-w-md gap-y-3"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
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
