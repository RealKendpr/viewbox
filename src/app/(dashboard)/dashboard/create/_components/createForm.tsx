"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { InputSet } from "../../_components/inputSet";
import { PageType } from "@/types/PageTypes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitBtn } from "../../_components/submitBtns";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("@/_components/modal"));

export function CreateForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const methods = useForm<PageType>({
    defaultValues: {
      websites: [{}],
    },
  });

  const onSubmit: SubmitHandler<PageType> = async (formData) => {
    setLoading(true);
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
          <SubmitBtn loading={loading} name="Create" />
        </form>
      </FormProvider>
    </>
  );
}
