export default function RequiredAlert({ errorMsg }: { errorMsg: string }) {
  return (
    <div className="mt-3 flex items-center gap-x-2 text-error">
      <p className="text-xs" role="alert">
        {errorMsg}
      </p>
    </div>
  );
}
