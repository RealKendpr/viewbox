import { LinkType } from "@/types/PageTypes";

export const emptyIndex = (links: LinkType[]) => {
  return links.reduce((acc: number[], item, index) => {
    if (item.linkName === "" && item.linkUrl === "") {
      acc.push(index);
    }
    return acc;
  }, []);
};
