import testUrl from "@(forms)/_utils/testUrl";

export const getUploadthingKey = (url: string) => {
  const acceptedUrlPattern = testUrl(url);
  if (!acceptedUrlPattern) {
    return "";
  }

  const parsedUrl = new URL(url);
  const key = parsedUrl.pathname.split("/").pop();

  if (!key) return "";

  return key;
};
