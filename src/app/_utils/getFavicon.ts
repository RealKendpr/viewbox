export function getFavicon(url: string) {
  const hasProtocol = /https?:\/\//;

  const formattedUrl = hasProtocol.test(url) ? url : `https://${url}`;

  try {
    const domain = new URL(formattedUrl).hostname;
    const iconSrc = `https://www.faviconextractor.com/favicon/${domain}/?larger=true`;

    return iconSrc;
  } catch {
    return "";
  }
}
