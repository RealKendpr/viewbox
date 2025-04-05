import { createAvatar } from "@dicebear/core";
import { useMemo } from "react";
import Image from "next/image";

export function UserAvatar({
  username,
  size,
  className,
  style,
}: {
  username: string;
  size: number;
  className?: string;
  style: any;
}) {
  const avatar = useMemo(() => {
    return createAvatar(style, {
      seed: username,
      size: size,
    }).toDataUri();
  }, [size, style, username]);

  return (
    <Image
      className={className}
      src={avatar}
      alt=""
      width={size}
      height={size}
    />
  );
}
