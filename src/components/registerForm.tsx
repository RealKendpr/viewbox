"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Inputs } from "./input";
import { register } from "@/app/login/actions";
import { useRouter } from "next/navigation";

export interface UserType {
  username: string;
  password: string;
}

export function RegisterForm() {
  const methods = useForm<UserType>();
  const router = useRouter();

  const onSubmit: SubmitHandler<UserType> = async (formData: UserType) => {
    const registerRes = await register(formData);

    if (registerRes) {
      router.push("/login");
    } else methods.reset();
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Inputs
          name="username"
          label="Username"
          placeholder="Username"
          pattern={/[A-Za-z][A-Za-z0-9\-]*/}
          minL={6}
          maxL={24}
        ></Inputs>
        <Inputs
          name="password"
          label="Password"
          placeholder="Password"
          // pattern={/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/}
          type="password"
          minL={6}
        ></Inputs>
        <button className="btn" type="submit">
          Create Account
        </button>
      </form>
    </FormProvider>
  );
}
