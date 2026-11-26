import OrderApis from "@/api/order";
import { browserApi } from "@/lib/browser-api";
import { OrderBody } from "@/validations/order";

/** Sends the order. A failed request throws an axios error, useErrorToast shows its message. */
export const sendOrder = async (body: OrderBody): Promise<{ orderId: number }> => {
  const { data } = await browserApi.post<{ orderId: number }>(OrderApis.sendOrder(), body);

  return data;
};
