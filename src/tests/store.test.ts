import { createRequestConfig } from "../lib/request.helpers";
import * as Store from "../projects/store.project";
import { ItemList } from "../lib/types/framework.types";
import { randomNumber, randomString } from "../lib/test-data.helpers";

export let options = {
  scenarios: {
    iterScenario: {
      exec: "scenario",
      executor: "shared-iterations",
      iterations: 1,
    },
    rumpingScenario: {
      exec: "scenario",
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "10s", target: 0 },
        { duration: "0s", target: 2 },
        { duration: "10s", target: 2 },
      ],
    },
  },
  thresholds: {
    http_req_duration: ["avg<500", "p(95)<1500"],
  },
};

const BASE_URL = __ENV.MY_HOSTNAME;

export function setup() {
  const userData = {
    username: `test${randomString(7)}${randomNumber(1, 999)}`,
    password: "abc555",
  };
  Store.register(BASE_URL, userData.username, userData.password);
  const authToken: string = Store.loginUser(
    BASE_URL,
    userData.username,
    userData.password,
  );
  return authToken;
}

export function scenario(authToken: string): void {
  const requestConfig = createRequestConfig(authToken);
  Store.addItem(BASE_URL, requestConfig, randomString(5));
  const response: ItemList = Store.getItems(BASE_URL, requestConfig);
  console.log("All items: " + JSON.stringify(response.items, null, 2));
  console.log(
    "Last item name: " + response.items[response.items.length - 1].name,
  );
  console.log(
    "Last item price: " + response.items[response.items.length - 1].price,
  );
}
