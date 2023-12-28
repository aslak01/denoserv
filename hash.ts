import { encodeHex } from "./deps.ts";

export async function hash(string: string) {
  const strBuffer = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest("SHA-256", strBuffer);
  const hash = encodeHex(hashBuffer);
  return hash;
}
