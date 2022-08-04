import { scryptSync, randomBytes } from "crypto";

const encryptPassowrd = (password: string, salt: string) => {
  return scryptSync(password, salt, 32).toString("hex");
};

export const hash = (password: string): string => {
  const salt = randomBytes(16).toString("hex");
  return encryptPassowrd(password, salt) + salt;
};

export const compare = (passowrd: string, hash: string): Boolean => {
  const salt = hash.slice(64);
  const originalPassHash = hash.slice(0, 64);
  const currentPassHash = encryptPassowrd(passowrd, salt);
  return originalPassHash === currentPassHash;
};

console.log(hash("un2345678"))