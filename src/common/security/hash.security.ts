import { compareSync, hashSync } from 'bcrypt';

export const generateHash = (plaintext: string): string => {
  return hashSync(plaintext, parseInt(process.env.SALT_ROUNDS!));
};

export const compareHash = (plaintext, hash): boolean => {
  return compareSync(plaintext, hash);
};
