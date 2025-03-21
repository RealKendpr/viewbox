export function favicon(url: string) {
  const hasProtocol = /https?:\/\//;

  const domain = new URL(hasProtocol.test(url) ? url : `https://${url}`)
    .hostname;
  const iconSrc = `http://api.faviconkit.com/${domain}/32`;

  return iconSrc;
}
