import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "../hooks/form-context";
import dynamic from "next/dynamic";
const Input = dynamic(() =>
  import("../create/_components/input").then((mod) => mod.Input),
);
const SubmitBtn = dynamic(() =>
  import("@dashboard/_components/saveButton").then((mod) => mod.SubmitBtn),
);

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Input,
  },
  formComponents: {
    SubmitBtn,
  },
});
