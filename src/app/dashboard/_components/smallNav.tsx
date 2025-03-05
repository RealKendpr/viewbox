'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SmallNav() {
  const isDashboard = usePathname() === '/dashboard';

  return (
    <div className="flex justify-between my-4">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link href={'/dashboard'}>Dashboard</Link>
          </li>
          {!isDashboard && (
            <li>
              <p>Create</p>
            </li>
          )}
        </ul>
      </div>
      {isDashboard && (
        <Link className="btn btn-secondary" href={'/dashboard/create'}>
          Create Page
        </Link>
      )}
    </div>
  );
}
