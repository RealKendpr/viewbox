"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InputSet } from "@dashboard/_components/inputSet";
import { EditPageType, PageType, LinkType } from "@/types/PageTypes";
import { useState } from "react";
import dynamic from "next/dynamic";
import { FormHeader } from "@/app/(home)/dashboard/_components/formHeader";
import { revalidateForm } from "../_utils/revalidateForm";
import { FormState } from "../../(forms)/formState";

const LinkDisplay = dynamic(
  () => import("@/app/(home)/dashboard/_components/LinkDisplay"),
);
const Modal = dynamic(() => import("@/_components/modal"));

export function EditForm({
  pageDetails,
  slug,
}: {
  pageDetails: EditPageType;
  slug: string;
}) {
  const extendedKeys = {
    _id: pageDetails._id,
    createdAt: pageDetails.createdAt,
  };
  const formDefaultValues = {
    pageIcon: pageDetails?.pageIcon,
    pageName: pageDetails?.pageName,
    pageDescription: pageDetails.pageDescription,
  };

  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [linkRequired, setLinkRequired] = useState<boolean>(false);

  const methods = useForm<EditPageType>({
    defaultValues: pageDetails,
  });

  const onSubmit: SubmitHandler<PageType> = async (formData) => {
    const newFormData: PageType = {
      ...formData,
      links: formData.links,
    };

    // const { links, ...rest } = formData;

    // console.log(formData.links.slice(0, formData.links.length - 1));
    console.log(formData);

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

    if (formData.links.length === 0) {
      setLinkRequired(true);
      methods.setError("root", {
        type: `{server', message:'Something is wrong with your request}`,
      });
      return;
    }

    // const response = await fetch("/api/update", {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ ...newFormData, ...extendedKeys }),
    // });

    // if (!response.ok) {
    //   if (response.status === 409) {
    //     setIsDuplicate(true);
    //     return;
    //   }

    //   methods.setError("root", {
    //     type: `{server', message:'Something is wrong with your request; status code: ${response.status}}`,
    //   });
    //   return;
    // }
    // should revalidate the pageDetails, so, that on 2nd attempt of update with no changes a promt should popup
    // revalidateForm(formDefaultValues.pageName);
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
