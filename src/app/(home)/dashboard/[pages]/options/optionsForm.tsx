"use client";

import { revalidateForm } from "../_utils/revalidateForm";
import { OptionsType } from "@/types/PageTypes";

export default function OptionsForm({
  slug,
  defaultValues,
}: {
  slug: string;
  defaultValues: OptionsType | null;
}) {
  const handleSubmit = async (formData: FormData) => {
    const formValues = {
      slug: slug,
      newTab: formData.get("newTab") == "on" ? true : false,
    };

    const response = await fetch("/api/update/options", {
      method: "PUT",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      return;
    }

    await revalidateForm(`${slug}/options`);
  };

  return (
    <form className="mt-10" action={handleSubmit}>
      <div className="flex justify-between">
        <label className="label" htmlFor="newTab">
          Open links in new tab?
        </label>
        <input
          id="newTab"
          name="newTab"
          type="checkbox"
          defaultChecked={defaultValues?.newTab}
          className="checkbox"
        />
      </div>
      <button
        className="btn btn-primary fixed right-[4%] bottom-[4%]"
        type="submit"
      >
        Save changes
      </button>
    </form>
  );
}
