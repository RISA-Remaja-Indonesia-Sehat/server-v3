import type { CookieOptions } from "express";

import { SignJWT, jwtVerify } from "jose";

export const CHILD_SESSION_COOKIE = "risa_child_session";

const sessionSecret = process.env.CHILD_SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("CHILD_SESSION_SECRET belum diatur.");
}

const secretKey = new TextEncoder().encode(sessionSecret);

export async function createChildSessionToken(childId: string) {
  return new SignJWT({
    role: "child",
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setSubject(childId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyChildSessionToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey, {
    algorithms: ["HS256"],
  });

  if (!payload.sub) {
    throw new Error("Invalid child session.");
  }

  return payload.sub;
}

export const childCookieOptions: CookieOptions = {
  httpOnly: true,

  secure: process.env.NODE_ENV === "production",

  sameSite: "lax",

  maxAge: 7 * 24 * 60 * 60 * 1000,

  path: "/",
};

export const childClearCookieOptions: CookieOptions = {
  httpOnly: true,

  secure: process.env.NODE_ENV === "production",

  sameSite: "lax",

  path: "/",
};
