import { Input } from "./input";

export function AccordionContents({ index }: { index: number }) {
  return (
    <>
      <Input
        label="Website Name"
        name={`websites.${index}.webName` as const}
        placeholder="Youtube"
        required={true}
        index={index}
      />
      <Input
        label="Website URL"
        name={`websites.${index}.webUrl` as const}
        placeholder="https://youtube.com/channel"
        type="url"
        required={true}
        index={index}
      />
      <Input
        label="Website Icon"
        name={`websites.${index}.webIcon` as const}
        placeholder="https://icons.com/icon"
        type="url"
        index={index}
      />
    </>
  );
}
