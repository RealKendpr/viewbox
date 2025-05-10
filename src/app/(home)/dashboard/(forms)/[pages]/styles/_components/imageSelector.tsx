export function ImageSelector({
  fieldName,
  currentStyle,
}: {
  fieldName: string;
  currentStyle: string;
}) {
  return (
    <div className="overflow-hidden">
      <div className="mb-3 flex items-center gap-x-3 lowercase">
        <div
          className="border-base-content size-6 shrink-0 rounded border-2"
          //   style={{ background: selected }}
        />
        <span className="w-3/4 truncate text-sm">{""}</span>
      </div>
    </div>
  );
}
