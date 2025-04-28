import { LinkType } from "@/types/PageTypes";
import testUrl from "../(home)/dashboard/(forms)/_utils/testUrl";

export function fixUrl(url: string) {
  const acceptedUrlPattern = testUrl(url);
  if (!acceptedUrlPattern) {
    return "";
  }

  const hasProtocol = /https?:\/\//;

  if (hasProtocol.test(url)) {
    return url;
  } else return `https://${url}`;
}

export function validUrls(links: LinkType[]) {
  return links.map((item) => {
    const { linkUrl, ...rest } = item;
    // if this returns an empty string it should be handled by zod schema
    const formattedUrl = fixUrl(linkUrl);

    return {
      linkUrl: formattedUrl,
      ...rest,
    };
  });
}
