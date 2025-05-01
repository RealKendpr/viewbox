"use client";

import { signOut } from "@/app/_lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();

  const handleLogout = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <button
      className="text-start hover:cursor-pointer"
      type="button"
      onClick={() => handleLogout()}
    >
      Logout
    </button>
  );
}
