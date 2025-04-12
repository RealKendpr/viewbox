export function Collapse({
  name,
  label,
  open,
  children,
}: {
  name: string;
  label: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-base-200 collapse">
      <label
        className="collapse-title text-base font-medium capitalize"
        htmlFor={name}
      >
        {label}
      </label>
      <input type="checkbox" name={name} id={name} defaultChecked={open} />
      <div className="collapse-content grid gap-y-7">{children}</div>
    </div>
  );
}
