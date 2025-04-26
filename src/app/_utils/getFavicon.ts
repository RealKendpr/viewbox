import { fixUrl } from "./fixUrl";

export function getFavicon(url: string) {
  const formattedUrl = fixUrl(url);

  try {
    const domain = new URL(formattedUrl).hostname;
    const iconSrc = `https://www.faviconextractor.com/favicon/${domain}/?larger=true`;

    return iconSrc;
  } catch {
    return "";
  }
}
