import { ItemToAdd } from "./types/framework.types";

export function randomString(length: number): string {
  const charset = "abcdefghijklmnopqrstuvwxyz";
  let res = "";
  while (length--) res += charset[(Math.random() * charset.length) | 0];
  return res;
}

export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomItem(): ItemToAdd {
  return {
    price: String(randomNumber(1, 1000)),
    store_id: randomNumber(1, 100000),
    description: "Описание",
    image: "url",
  };
}
