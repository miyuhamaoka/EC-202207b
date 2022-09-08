import Checkout from '../../components/checkout';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import ItemConfirm from '../../components/item_confirm';
import Layout from '../../components/layout';
import Router from 'next/router';

export async function getServerSideProps({ req }: any) {
  console.log('req', req.cookies.id);
  const res = await fetch(
    `http://localhost:8000/cartItems?userId=${req.cookies.id}`
  );
  const data = await res.json();
  const items = data[0].items;
  console.log('data', items);

  if (!data) {
    return { notFound: true };
  } else {
    return {
      props: { items },
    };
  }
}

const deleteUrlStorage = () => {
  localStorage.clear();
  if (document.cookie) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    document.cookie = `url=/items/order_confirm;max-age=0;path=/;expires=${date};`;
    Router.push('/items/order_checkouted')
  }
};

const OrderConfirm = ({ items }: any) => {
  return (
    <>
      <Layout />
      <div>
        <ItemConfirm item={items}></ItemConfirm>
      </div>
      <div>
        <Checkout></Checkout>
      </div>
      <button onClick={() => deleteUrlStorage()}>
          この内容で注文する
      </button>
    </>
  );
};

export default OrderConfirm;
