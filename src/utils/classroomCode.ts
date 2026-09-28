// Excludes ambiguous characters (0/O, 1/I) so codes are easy to read/type
const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export const CODE_LIFETIME_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

export function generateClassroomCode(length = 6): string {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

export function isCodeExpired(codeGeneratedAt: number): boolean {
  return Date.now() - codeGeneratedAt > CODE_LIFETIME_MS;
}