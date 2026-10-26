import "server-only";

export function internalContentHeaders(): Record<string, string> {
  const key = process.env.CONTENT_INTERNAL_API_KEY;
  return key ? { "X-FreshPrice-Internal-Key": key } : {};
}
