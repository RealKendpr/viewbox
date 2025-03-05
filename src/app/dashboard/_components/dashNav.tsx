import Link from 'next/link';
import LogoutBtn from './logout';
import { SmallNav } from './smallNav';

export function DashNav() {
  return (
    <header className="px-4">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link className="btn-link text-xl" href="/">
            OnePage
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">{/* Image Here */}</div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <LogoutBtn />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <SmallNav />
    </header>
  );
}
