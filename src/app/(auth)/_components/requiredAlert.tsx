export default function RequiredAlert({ errorMsg }: { errorMsg: string }) {
  return (
    <div className="flex items-center gap-x-2 text-error">
      <p className="text-xs" role="alert">
        {errorMsg}
      </p>
    </div>
  );
}
