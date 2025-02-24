"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Inputs } from "./input";

interface Inputs {
  username: string;
}

export function Form() {
  const methods = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Inputs
          name="username"
          label="Username"
          placeholder="Username"
        ></Inputs>
        <Inputs name="password" label="Password"></Inputs>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
