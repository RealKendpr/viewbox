"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { InputSet } from "@/app/(home)/dashboard/_components/inputSet";
import { PageType, LinkType } from "@/types/PageTypes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitBtn } from "@/app/(home)/dashboard/_components/submitBtns";
import dynamic from "next/dynamic";
const AddLink = dynamic(
  () => import("@/app/(home)/dashboard/_components/addLink"),
);
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
    router.push("/dashboard");
  };

  return (
    <>
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
      <FormProvider {...methods}>
        <form
          className="grid max-w-md gap-y-3"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <InputSet />
          <AddLink links={links} setLinks={setLinks} />
          <SubmitBtn loading={methods.formState.isSubmitting} name="Create" />
        </form>
      </FormProvider>
    </>
  );
}
