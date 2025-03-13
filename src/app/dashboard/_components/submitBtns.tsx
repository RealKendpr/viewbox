export function SubmitBtn({
  loading,
  name,
}: {
  loading: boolean;
  name: string;
}) {
  return (
    <button className="btn btn-primary w-full">
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        name
      )}
    </button>
  );
}
