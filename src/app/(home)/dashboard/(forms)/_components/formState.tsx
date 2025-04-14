"use client";

import { useFormContext } from "react-hook-form";

export function FormState() {
  const {
    formState: { errors },
  } = useFormContext();
  console.log("errors", errors);

  return <div></div>;
}
