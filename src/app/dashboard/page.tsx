"use client";

import { logout } from "../(auth)/actions";

export default function Dashboard() {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <button className="btn" type="submit" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}
