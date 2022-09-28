import Checkout from '../../components/checkout';
import ItemConfirm from '../../components/item_confirm';
import Layout from '../../components/itemlistlayout';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import style from '../../styles/item_confirm.module.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm';

// Stripe設定(public api key)
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export async function getServerSideProps({ req }: any) {
  // console.log('req', req.cookies.id);
  const res = await fetch(
    `http://localhost:8000/cartItems?userId=${req.cookies.id}`
  );
  const data = await res.json();
  const items = data[0].items;

  const userRes = await fetch(
    `http://localhost:8000/users/${req.cookies.id}`
  );
  const user = await userRes.json();

  if (!data) {
    return { notFound: true };
  } else {
    return {
      props: { items, user },
    };
  }
}

const OrderConfirm = ({ items, user }: any) => {
  const [name, setName] = useState(
    `${user.firstName} ${user.lastName}`
  );
  const onChangeName = (e: any) => setName(e.target.value);

  const [email, setEmail] = useState(user.email);
  const onChangeEmail = (e: any) => setEmail(e.target.value);

  const [zipcode, setZipcode] = useState(user.zipcode);
  const onChangeZipcode = (e: any) => setZipcode(e.target.value);

  const [address, setAddress] = useState(
    `${user.prefecture}${user.city}${user.aza}${user.building}`
  );
  const onChangeAddress = (e: any) => setAddress(e.target.value);

  const [tel, setTel] = useState(user.telephone);
  const onChangeTel = (e: any) => setTel(e.target.value);

  const [time, setTime] = useState('');
  const onChangeTime = (e: any) => setTime(e.target.value);

  const [sta, setSta] = useState(0);

  const [clientSecret, setClientSecret] = useState('');

  console.log('items', items);

  // Stripe 購入予定の商品情報をcreate-payment-intent apiへ送る
  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [items]);

  //支払いフォームスタイルの設定
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#fcba03',
      colorBackground: '#f7e5b6',
    },
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  const onChangeSta = (e: any) => {
    const value = Number(e.target.value);
    return setSta(value);
  };

  // 入力内容のサーバーへデータ送信、エラー表示
  const onClickPost = async () => {
    const now = new Date();
    const selectTime = new Date(time);
    const diffTime =
      (selectTime.getTime() - now.getTime()) / (60 * 60 * 1000);

    const itemPrice = items.map((item: any) => {
      return item.subtotal;
    });
    const total = itemPrice.reduce(
      (a: number, b: number) => a + b,
      0
    );

    if (
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
      diffTime < 3 ||
      selectTime.getHours() < 9 ||
      selectTime.getHours() > 20
    ) {
      alert('入力内容に誤りがあります');
      return;
    } else {
      const postParam = {
        id: 0,
        userId: user.id,
        status: sta,
        totalPrice: total,
        orderDate: now,
        distenationName: name,
        distenationEmail: email,
        distenationZipcode: zipcode,
        distenationAddress: address,
        distenationTel: tel,
        deliveryTime: time,
        paymentMethod: sta,
        user: user,
        orderItemList: items,
      };

      const parameter = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postParam),
      };

      const result = await fetch(
        'http://localhost:8000/order',
        parameter
      ).then((res) => {
        return res.json();
      });

      console.log(result);
      localStorage.clear();
      if (document.cookie) {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        document.cookie = `url=/items/order_confirm;max-age=0;path=/;expires=${date};`;
      }
    }
  };

  return (
    <>
      <Layout />
      <section className={style.confirm}>
        <div>
          <ItemConfirm item={items}></ItemConfirm>
        </div>
        <div>
          <Checkout
            user={user}
            name={name}
            onChangeName={onChangeName}
            email={email}
            onChangeEmail={onChangeEmail}
            zipcode={zipcode}
            onChangeZipcode={onChangeZipcode}
            address={address}
            onChangeAddress={onChangeAddress}
            tel={tel}
            onChangeTel={onChangeTel}
            time={time}
            onChangeTime={onChangeTime}
            onChangeSta={onChangeSta}
          ></Checkout>
        </div>
        {/* 代金引換時の表示 */}
        {sta === 1 && (
          <div>
            <button
              type="button"
              onClick={() => {
                onClickPost();
                Router.push('/items/order_checkouted');
              }}
            >
              この内容で注文する
            </button>
          </div>
        )}
        {/* クレジットカード時の表示 */}
        {sta === 2 && (
          <div className="App">
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm
                  onClickPost={onClickPost}
                  name={name}
                  email={email}
                  zipcode={zipcode}
                  address={address}
                  tel={tel}
                  time={time}
                  sta={sta}
                  items={items}
                  clientSecret={clientSecret}
                />
              </Elements>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default OrderConfirm;
