import "server-only";
import axios from "axios";

const required = (name: string) => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not set (see .env.example)`);
  }

  return value;
};

/**
 * The axios instance for the api of DH. It is used on the server only: the address (API_URL)
 * and the key of this site (ACCESS_KEY, the GUID of its client) never reach the browser.
 * The browser asks this site (a route handler or a server action), this site asks the api.
 */
export const createApi = () =>
  axios.create({
    baseURL: required("API_URL").replace(/\/+$/, "") + "/",
    timeout: 10_000,
    headers: {
      Accept: "application/json",
      "X-Access-Key": required("ACCESS_KEY"),
    },
  });

let instance: ReturnType<typeof createApi> | undefined;

/** Made on the first use, so a build without the env can still start */
export const getApi = () => (instance ??= createApi());
