export const pickRandomFromArray = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const generateRandomHexColor = (): string => {
  const hexChars = "123456789ABCDEF";

  return `#${new Array(6)
    .fill("")
    .map((_) => pickRandomFromArray(hexChars.split("")))
    .join("")}`;
};
