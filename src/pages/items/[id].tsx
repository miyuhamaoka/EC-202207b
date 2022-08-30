import Head from 'next/head';
import Image from 'next/image';
import { Item } from '../../types';
import { useState } from 'react';

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
  const [num, setNum] = useState(1)
  let total = num * detail.price
  return (
    <>
      <Head>
        <title>商品詳細</title>
      </Head>
      <div>
        <h1>{detail.name}</h1>
        <p>{detail.description}</p>
        <Image
          src={detail.image_path}
          width="300px"
          height="300px"
          alt={detail.description}
        />
        <p>金額：{detail.price}円（税込）</p>
      </div>
      <form name="info">
        <p>
          数量：
          <select name="quantity" onChange={(e: any) => setNum(e.target.value)}>
            <option value="1" selected>
              1
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {' '}個
        </p>
      </form>
      <p>この商品の金額：{total}円（税込）</p>
    </>
  );
};

export default ItemData;
