export const fileExt = (type: string) => {
  if (type == "image/png") {
    return ".png";
  }
  if (type == "image/jpeg") {
    return ".jpeg";
  }
  if (type == "image/gif") {
    return ".gif";
  }
  if (type == "image/svg+xml") {
    return ".svg";
  }
  return "";
};
