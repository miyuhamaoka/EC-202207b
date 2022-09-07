import Checkout from '../../components/checkout';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import ItemConfirm from '../../components/item_confirm';
import Layout from '../../components/itemlistlayout';
import { useState } from 'react';
import Router from 'next/router';
import style from '../../styles/item_confirm.module.css';

export async function getServerSideProps({ req }: any) {
  // console.log('req', req.cookies.id);
  const res = await fetch(
    `http://localhost:8000/cartItems?userId=${req.cookies.id}`
  );
  const data = await res.json();
  const items = data[0].items;
  // console.log('data', items);

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
  const [name, setName] = useState(user.name);
  const onChangeName = (e: any) => setName(e.target.value);

  const [email, setEmail] = useState(user.email);
  const onChangeEmail = (e: any) => setEmail(e.target.value);

  const [zipcode, setZipcode] = useState(user.zipcode);
  const onChangeZipcode = (e: any) => setZipcode(e.target.value);

  const [address, setAddress] = useState(user.address);
  const onChangeAddress = (e: any) => setAddress(e.target.value);

  const [tel, setTel] = useState(user.telephone);
  const onChangeTel = (e: any) => setTel(e.target.value);

  const [time, setTime] = useState('');
  const onChangeTime = (e: any) => setTime(e.target.value);

  const [sta, setSta] = useState(0);
  const onChangeSta = (e: any) => {
    const value = Number(e.target.value);
    return setSta(value);
  };

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
      diffTime <= 3
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
        orderltemList: items,
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
      Router.push('/items/order_checkouted');
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
        <button type="button" onClick={onClickPost}>
          この内容で注文する
        </button>
      </section>
    </>
  );
};

export default OrderConfirm;
