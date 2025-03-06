import { useWatch } from "react-hook-form";

export function WatchTitle({ name }: { name: string }) {
  const pageTitle = useWatch({
    name: name
  });

  if (pageTitle) return pageTitle;
  else return "[Empty title]";
}
