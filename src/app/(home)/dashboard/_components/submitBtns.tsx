export function SubmitBtn({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <button className="btn btn-primary">
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        children
      )}
    </button>
  );
}
