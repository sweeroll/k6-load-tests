import http from "k6/http";
import { check, group } from "k6";
import { setSleep } from "../lib/sleep.helpers";
import { ItemList, ItemToAdd } from "../lib/types/framework.types";
import { randomItem } from "../lib/test-data.helpers";

export function addItem(url: string, requestConfig: {}, nameItem: string) {
  group("Add Item", () => {
    const payload: ItemToAdd = randomItem();
    const res = http.post(
      `${url}/item/${nameItem}`,
      payload as {},
      requestConfig,
    );
    check(res, { "Item added": (r) => r.status === 201 });
    setSleep(0.5, 1);
  });
}

export function getItems(url: string, requestConfig: {}): ItemList {
  return group("Get Items", () => {
    const res = http.get(`${url}/items`, requestConfig);
    check(res, { "Items received": (r) => r.status === 200 });
    return res.json() as unknown as ItemList;
  });
}
