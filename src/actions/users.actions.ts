import http from "k6/http";
import { check } from "k6";
import { setSleep } from "../lib/sleep.helpers";

export function register(_url: string, username: string, password: string) {
  const res = http.post(`${_url}/register`, {
    username: username,
    password: password,
  });
  check(res, { "User Registered": (r) => r.status === 201 });
  setSleep(0.5, 1);
}

export function loginUser(_url: string, username: string, password: string) {
  const params = {
    headers: { "content-type": "application/json" },
  };
  const body = JSON.stringify({
    username: username,
    password: password,
  });
  const res = http.post(`http://localhost:56733/auth`, body, params);
  const data = res.json() as { access_token: string };
  check(res, { "User Logged": (r) => r.status === 200 });

  setSleep(0.5, 1);
  return data.access_token;
}
