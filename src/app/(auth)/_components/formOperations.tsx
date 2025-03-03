import Link from "next/link";
import { useFormStatus } from "react-dom";

export default function FormOperations({
  submitBtn,
  type,
}: {
  submitBtn: string;
  type: "login" | "register";
}) {
  const { pending } = useFormStatus();

  return (
    <div className="text-center mt-4">
      <button
        className="btn btn-primary btn-block"
        disabled={pending}
        type="submit"
      >
        {submitBtn}
      </button>
      <div className="divider">or</div>
      <Link
        className="underline"
        href={type === "login" ? "/register" : "/login"}
      >
        {type === "login" ? "Create an Account" : "Log In"}
      </Link>
    </div>
  );
}
