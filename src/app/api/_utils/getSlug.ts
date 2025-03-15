export function getSlug(pageName: string) {
  return pageName.trim().replace(/\s+/g, "-").toLowerCase();
}
