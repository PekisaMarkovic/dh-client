import axios from "axios";
import { NextResponse } from "next/server";
import OrderApis from "@/api/order";
import { getApi } from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";
import { t } from "@/translations/translate";
import { orderSchema } from "@/validations/order";

const fail = (statusCode: number, message: string) => NextResponse.json({ statusCode, message }, { status: statusCode });

/**
 * The cart sends the order here, and this handler sends it to the api with the ACCESS_KEY of the site
 * (the key is only on the server, the browser never sees it). The api checks everything again.
 */
export async function POST(request: Request) {
  let values;

  try {
    // the same rules as the form, unknown fields are dropped (the api refuses them)
    values = await orderSchema.validate(await request.json(), { stripUnknown: true });
  } catch {
    return fail(400, t("cart:invalid"));
  }

  try {
    const { data } = await getApi().post(OrderApis.apiOrder(), values);

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    // what the api answered (its status and message), or what happened when it did not answer
    const status = axios.isAxiosError(error) && error.response ? error.response.status : 502;

    return fail(status, getApiErrorMessage(error));
  }
}
