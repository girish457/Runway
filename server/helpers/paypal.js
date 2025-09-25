const paypal = require("paypal-rest-sdk");

const mode = process.env.PAYPAL_MODE || "sandbox"; // "sandbox" or "live"
const clientId = process.env.PAYPAL_CLIENT_ID || "demo";
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "demo";

paypal.configure({
  mode,
  client_id: clientId,
  client_secret: clientSecret,
});

module.exports = paypal;
