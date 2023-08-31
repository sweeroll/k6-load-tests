import { JSONValue } from "k6";

export function createRequestConfig(authToken: JSONValue): {} {
  return {
    headers: {
      Authorization: `JWT ${authToken}`,
    },
  };
}
