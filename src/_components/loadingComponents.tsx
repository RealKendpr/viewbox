export function LoadingSpinner() {
  return (
    <div className="grid h-full place-items-center">
      <span className="loading loading-spinner loading-xl" />
    </div>
  );
}

export function PageListSkeleton({ count }: { count: number }) {
  return (
    <tbody>
      {Array.from({ length: count }).map((_, index) => (
        <tr key={index}>
          <td className="hidden text-end md:table-cell">
            <div className="skeleton inline-block h-[64px] w-[64px]" />
          </td>
          <td>
            <div className="skeleton h-5 w-[10ch]" />
          </td>
          <td className="hidden sm:table-cell">
            <div className="skeleton h-5 w-[10ch]" />
          </td>
          <td>
            <div className="skeleton mx-auto h-6 w-[50px]" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
