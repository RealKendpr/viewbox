import { useWatch } from "react-hook-form";
import { useEffect, useState } from "react";

export function WatchTitle({ name }: { name: string }) {
  const websiteName = useWatch({
    name: name
  });

  if (websiteName) return <>{websiteName}</>;
  else return <p>[Empty title]</p>;
}

export function WatchUrl({ name }: { name: string }) {
  const websiteIcon = useWatch({
    name: name
  });

  const [favicon, setFavicon] = useState("");
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  useEffect(() => {
    // goodness this one took me ages
    const timeoutId = setTimeout(() => {
      // added a delay before setting favicon to prevent the image from fetching too often and with an invalid url; debouncing
      try {
        const domain = new URL(websiteIcon).hostname;
        setFavicon(`https://api.faviconkit.com/${domain}/32`);
      } catch (error) {
        setFavicon("");
        return;
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [websiteIcon]);

  // render the img, only if the websiteIcon is a valid regex to make sure there is already a valid domain for the api and already set as the favicon
  return (
    urlRegex.test(websiteIcon) &&
    favicon != "" && <img src={favicon} alt="" width={32} height={32} />
  );
}
