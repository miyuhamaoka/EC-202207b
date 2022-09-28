import { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

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
  clientSecret,
}: any) {
  //useStripe(), useElements()フックの使用
  const stripe = useStripe();
  const elements = useElements();

  //支払いの追跡、エラーの表示用のstate
  const [message, setMessage]: [string, any] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        //TODO succeeded, processing時が表示されない
        switch (paymentIntent!.status) {
          case 'succeeded':
            setMessage('成功しました');
            break;
          case 'processing':
            setMessage('プロセス中');
            break;
          case 'requires_payment_method':
            setMessage('支払い内容を確認してください');
            break;
          default:
            setMessage('何かエラーがあります');
            break;
        }
      });
  }, [clientSecret, stripe]);

  // カード情報送信時の処理
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    // 支払いフォームのデータによってPaymentIntentを確認
    const { error } = await stripe.confirmPayment({
      elements,
      // 支払い成功時に遷移するURL
      confirmParams: {
        return_url: 'http://localhost:3000/items/order_checkouted',
      },
    });
    // 決済がエラーの際、下記の処理になる
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

  // 入力情報が誤っているときに注文ボタンが押せないようにする際の条件定義用
  const now = new Date();
  const selectTime = new Date(time);
  const diffTime =
    (selectTime.getTime() - now.getTime()) / (60 * 60 * 1000);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* iframe(支払いフォーム)の追加 */}
      <PaymentElement id="payment-element" />
      {/* messageの表示 */}
      {message && <div id="payment-message">{message}</div>}
      {/* 注文ボタン （取得の失敗、入力情報の誤りで無効化） */}
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
          !clientSecret ||
          items.length === 0 ||
          !email.match(
            /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
          ) ||
          !zipcode.match(/^\d{3}-\d{4}$/) ||
          !tel.match(/^\d{2,4}-\d{3,4}-\d{4}$/) ||
          diffTime < 3
        }
        id="submit"
        type="submit"
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
    </form>
  );
}
