const stripe = require("stripe")('sk_test_51LkLe7BiB9jVEIuZO10YySWsQFLgymDiv9SEPSPrFcJumC0ginpj2e2LuuqofPGNZMIQkzXi1N7vz9Rq9sFEBSCt00GooID5r9');

const calculateOrderAmount = (items: any) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  const itemtotal = items.map((e: any) => e.subtotal);
  const total = itemtotal.reduce((a: number, b: number) => a + b);
  return Math.round(total * 1.08)
};

export default async function handler(req: any, res: any) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'jpy',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
