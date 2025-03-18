export function favicon(url: string) {
  const domain = new URL(url).hostname;
  const iconSrc = `http://api.faviconkit.com/${domain}/32`;

  return iconSrc;
}
