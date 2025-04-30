import { fixUrl } from "./fixUrl";

export function getFavicon(url: string) {
  const formattedUrl = fixUrl(url);

  try {
    const domain = new URL(formattedUrl).hostname;
    const iconSrc = `http://localhost:3000/api/favicon/${domain}/?larger=true`;

    return iconSrc;
  } catch {
    return "";
  }
}
