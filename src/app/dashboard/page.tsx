import { SignOut } from "@/lib/actions";

export default function Dashboard() {
  return (
    <div>
      <h1>Welcome!</h1>

      <form action={SignOut}>
        <button className="btn" type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
}
