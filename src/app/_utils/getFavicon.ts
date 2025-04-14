export function getFavicon(url: string) {
  const hasProtocol = /https?:\/\//;

  const formattedUrl = hasProtocol.test(url) ? url : `https://${url}`;

  try {
    const domain = new URL(formattedUrl).hostname;
    const iconSrc = `http://api.faviconkit.com/${domain}/32`;

    return iconSrc;
  } catch {
    return "";
  }
}
