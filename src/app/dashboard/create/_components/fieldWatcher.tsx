import { useWatch } from "react-hook-form";
import { useEffect, useState } from "react";

export function WatchTitle({ name }: { name: string }) {
  const pageTitle = useWatch({
    name: name
  });

  if (pageTitle) return <>{pageTitle}</>;
  else return <p>[Empty title]</p>;
}

export function WatchLinks({ name }: { name: string }) {
  const linkIcon = useWatch({
    name: name
  });

  const [favicon, setFavicon] = useState("");
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  useEffect(() => {
    // goodness this one took me ages
    try {
      const domain = new URL(linkIcon).hostname;
      setFavicon(`https://api.faviconkit.com/${domain}/32`);
    } catch (error) {
      return;
    }
  }, [linkIcon]);

  // render the img, only if the linkIcon is a valid regex to make sure there is already a valid domain for the api and already set as the favicon
  return (
    urlRegex.test(linkIcon) &&
    favicon && <img src={favicon} alt="" width={32} height={32} />
  );
}
