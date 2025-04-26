export function fixUrl(url: string) {
  const hasProtocol = /https?:\/\//;

  if (hasProtocol.test(url)) {
    return url;
  } else return `https://${url}`;
}
