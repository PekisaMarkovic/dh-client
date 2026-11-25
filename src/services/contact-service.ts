import ContactApis from "@/api/contact";
import { browserApi } from "@/lib/browser-api";
import { ContactValues } from "@/validations/contact";

/** Sends the message of the contact form. A failed request throws an axios error, useErrorToast shows its message. */
export const sendContact = async (values: ContactValues): Promise<void> => {
  await browserApi.post(ContactApis.sendContact(), values);
};
