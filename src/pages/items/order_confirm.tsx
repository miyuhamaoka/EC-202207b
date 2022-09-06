import Checkout from '../../components/checkout';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import ItemConfirm from '../../components/item_confirm';
import Layout from '../../components/layout';

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
      <button>
        <Link href="/items/order_checkouted">
          <a>この内容で注文する</a>
        </Link>
      </button>
    </>
  );
};

export default OrderConfirm;
