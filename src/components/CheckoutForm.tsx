import { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Styles from '../styles/item_confirm.module.css';

export default function CheckoutForm({
  onClickPost,
  name,
  email,
  zipcode,
  address,
  tel,
  time,
  sta,
  items,
}: any) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage]: [string, any] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(
      window.location.search
    ).get('payment_intent_client_secret');

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent!.status) {
          case 'succeeded':
            setMessage('Payment succeeded!');
            break;
          case 'processing':
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setMessage(
              'Your payment was not successful, please try again.'
            );
            break;
          default:
            setMessage('Something went wrong.');
            break;
        }
      });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000/items/order_checkouted',
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (
      error.type === 'card_error' ||
      error.type === 'validation_error'
    ) {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const now = new Date();
  const selectTime = new Date(time);
  const diffTime =
    (selectTime.getTime() - now.getTime()) / (60 * 60 * 1000);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={
          isLoading ||
          !stripe ||
          !elements ||
          !name ||
          !email ||
          !zipcode ||
          !address ||
          !tel ||
          !time ||
          !sta ||
          items.length === 0 ||
          !email.match(
            /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
          ) ||
          !zipcode.match(/^\d{3}-\d{4}$/) ||
          !tel.match(/^\d{2,4}-\d{3,4}-\d{4}$/) ||
          diffTime < 3
        }
        id="submit"
        onClick={onClickPost}
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            'この内容で注文する'
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
