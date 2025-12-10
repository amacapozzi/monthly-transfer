import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import { APP_CONSTANTS } from "@/core/config/app";
const ALGO = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16; // 128 bits

const KEY = createHash("sha256").update(APP_CONSTANTS.ENCRYPTION_KEY).digest();

export function encryptString(plainText: string): string {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGO, KEY, iv);

  const ciphertext = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);

  const authTag = cipher.getAuthTag();

  const packed = Buffer.concat([iv, authTag, ciphertext]);

  return packed.toString("base64url");
}

export function decryptString(token: string): string {
  const packed = Buffer.from(token, "base64url");

  const iv = packed.subarray(0, IV_LENGTH);
  const authTag = packed.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const ciphertext = packed.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

  const decipher = createDecipheriv(ALGO, KEY, iv);
  decipher.setAuthTag(authTag);

  const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

  return plain.toString("utf8");
}

export function encryptJson<T>(value: T): string {
  const json = JSON.stringify(value);
  return encryptString(json);
}

export function decryptJson<T = unknown>(token: string): T {
  const json = decryptString(token);
  return JSON.parse(json) as T;
}
