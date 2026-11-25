import axios from "axios";

/**
 * The axios instance for the browser. It talks to the route handlers of THIS site (/api/...),
 * not to the api of DH: the api address and the ACCESS_KEY stay on the server, the handler adds the key.
 */
export const browserApi = axios.create({
  baseURL: "/api/",
  timeout: 15_000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});
