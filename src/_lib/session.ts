import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string, username: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await encrypt({ userId, username, expiresAt });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

type SessionPayload = {
  userId: string;
  username: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = "",
  pathname: string,
) {
  try {
    if (!session && pathname === "/dashboard")
      throw new Error("no session found");

    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    // log expected error only when trying visiting /dashboard without a session
    if (!session && pathname === "/dashboard")
      console.log((error as Error).message);
  }
}

import { NextRequest } from "next/server";

export async function hasSession(request: NextRequest) {
  const cookie = (await cookies()).get("session")?.value;

  const session = await decrypt(cookie, request.nextUrl.pathname);

  if (session?.userId) return true;
  else return false;
}

export async function getUsername(pathname: string) {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) {
    return null;
  }
  const sessionData = await decrypt(cookie, pathname);
  return sessionData?.username;
}
