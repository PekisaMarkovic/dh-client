import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { isPickupDateAllowed } from "@/lib/pickup-date";
import { PHONE_PATTERN } from "@/validations/contact";

// the texts of the errors are in translations/*/errors.json under the name of the field

// the contact of the buyer, the address and the day of the delivery: the same rules as the api (CreateOrderDto)
export const orderDetailsSchema = Yup.object({
  fullName: Yup.string().typeError("fullName").trim().required("fullName").min(2, "fullName").max(150, "fullName"),
  email: Yup.string().typeError("email").trim().required("email").email("email").max(150, "email"),
  phone: Yup.string().typeError("phone").trim().required("phone").matches(PHONE_PATTERN, "phone"),
  // where the courier of the shop delivers the order
  address: Yup.string().typeError("address").trim().required("address").min(5, "address").max(255, "address"),
  pickupDate: Yup.string()
    .typeError("pickupDate")
    .required("pickupDate")
    .test("pickupDate", "pickupDate", (value) => isPickupDateAllowed(value ?? "")),
});

export type OrderDetailsValues = Yup.InferType<typeof orderDetailsSchema>;

export const ORDER_DETAILS_VALIDATION = yupResolver(orderDetailsSchema);

// what the site sends: the details and the drinks (only the ids and the quantities, the prices come from the database)
export const orderSchema = orderDetailsSchema.shape({
  items: Yup.array()
    .of(
      Yup.object({
        drinkId: Yup.number().integer().min(1).required(),
        quantity: Yup.number().integer().min(1).max(999).required(),
      }),
    )
    .min(1)
    .max(50)
    .required(),
});

export type OrderBody = Yup.InferType<typeof orderSchema>;
