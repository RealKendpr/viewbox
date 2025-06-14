export default function testUrl(url: string) {
  const urlPattern =
    /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  const isUrl = urlPattern.test(url);
  return isUrl;
}
