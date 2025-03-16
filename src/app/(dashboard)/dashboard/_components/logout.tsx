"use client";

import { logout } from "@/app/(dashboard)/(auth)/actions";

export default function LogoutBtn() {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };
  return <button onClick={handleLogout}>Log Out</button>;
}
