"use client";

export default function OptionsForm({ pageName }: { pageName: string }) {
  const handleSubmit = async (formData: FormData) => {
    const formValues = {
      slug: pageName,
      newTab: formData.get("newTab") == "on" ? true : false,
    };

    const response = await fetch("/api/update/layout", {
      method: "PUT",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      return;
    }
  };
  return (
    <form className="mt-10" action={handleSubmit}>
      <div className="flex justify-between">
        <label className="label" htmlFor="newTab">
          Open links in new tab?
        </label>
        <input id="newTab" name="newTab" type="checkbox" className="checkbox" />
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
