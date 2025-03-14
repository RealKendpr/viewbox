"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { getPathname } from "../_utils/getPathname";
import { InputSet } from "../../_components/inputSet";
import { FormPageType } from "@/types/PageTypes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitBtn } from "../../_components/submitBtns";
import dynamic from "next/dynamic";
const DuplicateAlert = dynamic(() => import("./duplicateAlert"));

export function CreateForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const methods = useForm<FormPageType>({
    defaultValues: {
      websites: [{}],
    },
  });

  const handleModal = () => setIsDuplicate((isDuplicate) => !isDuplicate);

  const onSubmit: SubmitHandler<FormPageType> = async (formData) => {
    setLoading(true);
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Pathname": await getPathname(),
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      if (response.status === 400) {
        setLoading(false);
        handleModal();
      }
      return;
    }
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <>
      {isDuplicate && (
        <DuplicateAlert
          isDuplicate={isDuplicate}
          handleModal={handleModal}
          setIsDuplicate={setIsDuplicate}
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
