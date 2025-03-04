"use client";

import { logout } from "@/app/(auth)/actions";

export default function LogoutBtn() {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button className="btn" type="submit" onClick={handleLogout}>
      Log Out
    </button>
  );
}
