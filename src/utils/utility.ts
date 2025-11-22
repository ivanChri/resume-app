export function generateRandomId(length: number = 10): string {
  const randomPart = Math.random().toString(36).substring(2);
  if (randomPart.length < length) {
    return (randomPart + Math.random().toString(36).substring(2)).substring(0, length);
  }
  return randomPart.substring(0, length);
}