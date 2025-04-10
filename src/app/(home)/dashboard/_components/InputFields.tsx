"use client";

import { EditPageType } from "@/types/PageTypes";
import { withForm } from "@dashboard/hooks/form-hook";

export const InputFields = withForm({
  defaultValues: {} as EditPageType,
  render: function Render({ form }) {
    return (
      <div className="grid gap-y-4">
        <div className="fieldset">
          <label htmlFor="avatar" className="fieldset-legend place-self-start">
            Pick an Avatar
          </label>
          <input type="file" id="avatar" className="file-input w-full" />
          <p className="fieldset-label">Max size 2MB</p>
        </div>
        <form.AppField
          name="pageName"
          validators={{
            onSubmit: ({ value }) =>
              !value ? "Page name is required." : undefined,
          }}
        >
          {(field) => <field.Input name="pageName" label="Page Title" />}
        </form.AppField>
        <div className="fieldset">
          <label
            htmlFor="pageDescription"
            className="fieldset-legend place-self-start"
          >
            Your bio
          </label>
          <form.Field name="pageDescription">
            {(field: any) => (
              <textarea
                className="textarea h-11 w-full"
                placeholder="Bio"
                id="pageDescription"
                defaultValue={field.state.value}
                maxLength={100}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
          <div className="fieldset-label">Optional</div>
        </div>
      </div>
    );
  },
});
