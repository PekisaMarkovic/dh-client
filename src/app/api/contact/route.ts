import axios from "axios";
import { NextResponse } from "next/server";
import ContactApis from "@/api/contact";
import { getApi } from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";
import { t } from "@/translations/translate";
import { contactSchema } from "@/validations/contact";

const fail = (statusCode: number, message: string) => NextResponse.json({ statusCode, message }, { status: statusCode });

/**
 * The contact form sends its message here, and this handler sends it to the api with the ACCESS_KEY of the site
 * (the key is only on the server, the browser never sees it).
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return fail(400, t("contact:invalid"));
  }

  let values;

  try {
    // the same rules as the form, unknown fields are dropped (the api refuses them)
    values = await contactSchema.validate(body, { stripUnknown: true });
  } catch {
    return fail(400, t("contact:invalid"));
  }

  try {
    const { data } = await getApi().post(ContactApis.apiContact(), values);

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    // what the api answered (its status and message), or what happened when it did not answer
    const status = axios.isAxiosError(error) && error.response ? error.response.status : 502;

    return fail(status, getApiErrorMessage(error));
  }
}
