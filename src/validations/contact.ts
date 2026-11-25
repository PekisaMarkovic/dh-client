import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// the texts of the errors are in translations/*/errors.json under the name of the field
export const PHONE_PATTERN = /^[0-9+\-()\s/.]{6,30}$/;

// the same rules as the api (CreateContactDto), the route handler of this site checks them too
export const contactSchema = Yup.object({
  name: Yup.string().typeError("name").trim().required("name").max(150, "name"),
  phone: Yup.string().typeError("phone").trim().required("phone").matches(PHONE_PATTERN, "phone"),
  email: Yup.string().trim().email("email").max(150, "email").default(""),
  message: Yup.string().trim().max(2000, "message").default(""),
});

export type ContactValues = Yup.InferType<typeof contactSchema>;

export const CONTACT_VALIDATION = yupResolver(contactSchema);
