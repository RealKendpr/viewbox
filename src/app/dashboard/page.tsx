"use client";

import { logout } from "../login/actions";

export default function Dashboard() {
  return (
    <div>
      <h1>Welcome!</h1>
      <button className="btn" type="submit" onClick={() => logout()}>
        Log Out
      </button>
    </div>
  );
}
