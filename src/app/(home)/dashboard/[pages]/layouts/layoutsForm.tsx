"use client";

import layouts from "@/layouts/layouts.json";

export function LayoutsForm({
  slug,
  activeLayout,
}: {
  slug: string;
  activeLayout: string | null;
}) {
  const handleSubmit = async (formData: FormData) => {
    const activeLayout = formData.get("layout");

    const formValues = {
      slug: slug,
      active: activeLayout,
    };

    const response = await fetch("/api/update/layouts", {
      method: "PUT",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      return;
    }
  };

  return (
    <form action={handleSubmit}>
      <div className="flex justify-between">
        {layouts.layouts?.map((i) => (
          <div key={i}>
            <label className="label" htmlFor={i}>
              {i}
            </label>
            <input
              className="radio"
              type="radio"
              name="layout"
              id={i}
              value={i}
              defaultChecked={
                activeLayout ? i === activeLayout : i === "default"
              }
            />
          </div>
        ))}
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
