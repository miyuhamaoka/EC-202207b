import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';

export async function getStaticPaths() {
  const res = await fetch('http://localhost:8000/items');
  const number = await res.json();
  const paths = number.map((num: any) => {
    return { params: { id: num.id.toString() } };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(`http://localhost:8000/items/${params.id}`);
  const detail = await res.json();
  if (!detail.id) {
    return { notFound: true };
  } else {
    return {
      props: { detail },
      revalidate: 1,
    };
  }
}

const ItemData = ({ detail }: any) => {


  const cookie = () => {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie;
      console.log('id', cookies);
      const cookieArray = cookies.split('; ')
      console.log('need', cookieArray[0].slice(3))
      return Number(cookieArray[0].slice(3));
    }
  };
  console.log('cookie', cookie());

  const router = useRouter();
  const [num, setNum] = useState(1);
  let total = num * detail.price;

  const Submit = async () => {
    const res = await fetch(
      `http://localhost:8000/cartItems?userId=${cookie()}`
    );
    const data = await res.json();

    console.log('data', data)


    if (data[0]) {
      return fetch(`http://localhost:8000/cartitems/${data[0].id}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          items: [
            ...data[0].items,
            {
              id: detail.id,
              type: detail.type,
              name: detail.name,
              description: detail.description,
              price: detail.price,
              image_path: detail.image_path,
              deleted: detail.deleted,
              priceM: detail.priceM,
              priceL: detail.priceL,
              quantity: num,
              subtotal: num * detail.price,
            },
          ],
        }),
      });
    } else if (!data[0]) {
      return fetch(`http://localhost:8000/cartitems`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          userId: cookie(),
          items: [
            {
              id: detail.id,
              type: detail.type,
              name: detail.name,
              description: detail.description,
              price: detail.price,
              image_path: detail.image_path,
              deleted: detail.deleted,
              priceM: detail.priceM,
              priceL: detail.priceL,
              quantity: num,
              subtotal: num * detail.price,
            },
          ],
        }),
      });
    }
  };


  return (
    <>
      <Head>
        <title>商品詳細</title>
      </Head>
      <div>
        <Layout></Layout>
        <h1>{detail.name}</h1>
        <p>{detail.description}</p>
        <Image
          src={detail.image_path}
          width="300px"
          height="300px"
          alt={detail.description}
        />
        <p>金額：{detail.price}円</p>
      </div>
      <form method="post">
        <p>
          数量：
          <select
            name="quantity"
            onChange={(e: any) => setNum(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>{' '}
          個
        </p>
        <p>この商品の金額：{total}円</p>
        <button
          type="button"
          onClick={() => {
            Submit();
            router.push(`/items/cart?userId=${cookie()}`);
          }}
        >
          カートに入れる
        </button>
      </form>
    </>
  );
};

export default ItemData;
