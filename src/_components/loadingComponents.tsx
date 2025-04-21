export function LoadingSpinner() {
  return (
    <div className="grid h-full place-items-center">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  );
}

export function PageListSkeleton({ count }: { count: number }) {
  return (
    <tbody>
      {Array.from({ length: count }).map((_, index) => (
        <tr key={index}>
          <td className="hidden text-end md:table-cell">
            <div className="skeleton inline-block h-[64px] w-[64px]"></div>
          </td>
          <td>
            <div className="skeleton h-5 w-[10ch]"></div>
          </td>
          <td className="hidden sm:table-cell">
            <div className="skeleton h-5 w-[10ch]"></div>
          </td>
          <td>
            <div className="skeleton mx-auto h-6 w-[50px]"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
