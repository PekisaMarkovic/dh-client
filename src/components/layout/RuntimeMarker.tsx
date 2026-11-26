import { connection } from "next/server";

/**
 * A marker for Next: the title and the canonical address of the pages of the drinks menu depend on the address
 * (runtime data), so they stream in after the page on purpose. The page itself is still prerendered.
 * Without it the build fails. It renders nothing.
 */
const RuntimeMarker = async () => {
  await connection();

  return null;
};

export default RuntimeMarker;
