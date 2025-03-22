import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import { useMemo } from "react";
import Image from "next/image";

export function UserAvatar({ username }: { username: string }) {
  const avatar = useMemo(() => {
    return createAvatar(initials, {
      seed: username,
      size: 48,
    }).toDataUri();
  }, []);

  return <Image src={avatar} alt="" width={40} height={40} />;
}
