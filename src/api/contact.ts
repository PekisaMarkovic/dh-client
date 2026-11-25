// the address of the route handler of this site (src/app/api/contact/route.ts) that forwards the message to the api
const sendContact = () => "contact";

// the address of the api of DH, used by the route handler
const apiContact = () => "public/contact";

const ContactApis = { sendContact, apiContact };

export default ContactApis;
