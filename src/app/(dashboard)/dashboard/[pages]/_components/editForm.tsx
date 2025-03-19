"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InputSet } from "../../_components/inputSet";
import { EditPageType, PageType, WebsiteType } from "@/types/PageTypes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { SubmitBtn } from "../../_components/submitBtns";
const DeletePageBtn = dynamic(() =>
  import("../deletePage").then((mod) => mod.DeletePageBtn),
);
const AddWebsite = dynamic(() => import("@dashboard/_components/addWebsite"));
const Modal = dynamic(() => import("@/_components/modal"));

export function EditForm({ pageDetails }: { pageDetails: string | null }) {
  const pageDetailsResult: EditPageType =
    pageDetails && JSON.parse(pageDetails);

  const extendedKeys = {
    _id: pageDetailsResult._id,
    createdAt: pageDetailsResult.createdAt,
  };
  const formDefaultValues = {
    pageIcon: pageDetailsResult?.pageIcon,
    pageName: pageDetailsResult?.pageName,
    pageDescription: pageDetailsResult.pageDescription,
  }; // websites must be handled by a useState,
  // because it was not exclusively a part of the form when data
  // was created/submitted to server
  const [website, setWebsite] = useState<WebsiteType[]>(
    pageDetailsResult.websites,
  );

  const router = useRouter();
  const [isSame, setIsSame] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);

  const methods = useForm<PageType>({
    defaultValues: formDefaultValues,
  });

  const onSubmit: SubmitHandler<PageType> = async (formData) => {
    const newFormData: PageType = {
      ...formData,
      websites: website,
    };

    // check if submitted data and current value is the same,
    // before proceeding to avoid unnecessary request
    // and show an alert about it
    if (
      JSON.stringify(newFormData) ===
      JSON.stringify({
        ...formDefaultValues,
        websites: pageDetailsResult.websites,
      })
    ) {
      setIsSame(true);
      return;
    }
    setIsSame(false);

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
  };

  return (
    <>
      <Modal isOpen={isSame} setIsOpen={setIsSame}>
        <p className="text-info flex items-center gap-x-2 font-semibold">
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
          <span>No changes detected</span>
        </p>
        <p className="py-4 text-sm">
          You don't need to update, because you didn't change anything.
        </p>
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
      <FormProvider {...methods}>
        <form className="max-w-md" onSubmit={methods.handleSubmit(onSubmit)}>
          <InputSet />
          <AddWebsite
            website={website}
            setWebsite={setWebsite}
            methods={methods}
          />

          <SubmitBtn loading={methods.formState.isSubmitting} name="Update" />
          <DeletePageBtn pageId={extendedKeys._id} router={router} />
        </form>
      </FormProvider>
    </>
  );
}
