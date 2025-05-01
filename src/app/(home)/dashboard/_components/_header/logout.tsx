import { signOut } from "@/auth";

export default function LogoutBtn() {
  return (
    <form
      className="auto-cols-fr"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="text-start hover:cursor-pointer" type="submit">
        Logout
      </button>
    </form>
  );
}
