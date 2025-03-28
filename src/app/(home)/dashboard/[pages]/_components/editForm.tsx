"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InputSet } from "../../_components/inputSet";
import { EditPageType, PageType, LinkType } from "@/types/PageTypes";
import { useState } from "react";
import dynamic from "next/dynamic";
import { SubmitBtn } from "../../_components/submitBtns";
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
  const [updated, setUpdated] = useState<boolean>(false);
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
      setUpdated(true);
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
    setUpdated(true);
    // should revalidate the pageDetails, so, that on 2nd attempt of update with no changes a promt should popup
    revalidateForm(formDefaultValues.pageName);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className="max-w-md" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex justify-end">
            <SubmitBtn loading={methods.formState.isSubmitting}>
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
              <span>Save</span>
            </SubmitBtn>
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
      <Modal isOpen={updated} setIsOpen={setUpdated}>
        <p className="text-success flex items-center gap-x-2 font-semibold">
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
          <span>Updated successfully</span>
        </p>
      </Modal>
    </>
  );
}
