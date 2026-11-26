// the address of the route handler of this site (src/app/api/order/route.ts) that forwards the order to the api
const sendOrder = () => "order";

// the address of the api of DH, used by the route handler
const apiOrder = () => "public/orders";

const OrderApis = { sendOrder, apiOrder };

export default OrderApis;
