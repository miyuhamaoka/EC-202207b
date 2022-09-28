import { NextApiRequest, NextApiResponse } from 'next';

//yarn add stripe
// npm install --save @stripe/react-stripe-js @stripe/stripe-js

//stripeの取得(secret api key)
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//カートアイテムの合計金額計算関数定義
const calculateOrderAmount = (items: any) => {
  const itemtotal = items.map((e: any) => e.subtotal);
  const total = itemtotal.reduce((a: number, b: number) => a + b);
  return Math.round(total * 1.08)
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { items } = req.body;
  // PaymentIntentオブジェクトの作成
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'jpy',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // clientSecretを返す
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
