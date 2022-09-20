import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Order, Orderitem, Item } from '../types';
import styles from '../components/items.module.css';
import Image from 'next/image';
import Link from 'next/link';

const fetcher: (args: string) => Promise<any> = (...args) =>
  fetch(...args).then((res) => res.json());

const Reccomend = () => {
  //購入データ取得
  const [dataItem, setData] = useState<Order[]>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/reccomend');
      const data = await res.json();
      setData(data.data);
    };
    fetchData();
  }, []);
  console.log('data', dataItem);
  const itemArray = dataItem?.map((e: Order) => e.orderItemList);
  console.log('itemArray', itemArray);
  const getItemArray: number[] = [];
  itemArray?.map((e: Orderitem) =>
    e.forEach((f: Item) => getItemArray.push(f.id))
  );
  console.log('getItemArray', getItemArray);
//各商品の購入回数計算
  const count: { [key: number]: number } = {};
  getItemArray.forEach((i: number) => {
    count[i] = (count[i] || 0) + 1;
  });
  console.log('count', count);

//一番購入回数の多い商品の取得
  const quantity = Object.values(count);
  const max = Math.max(...quantity);
  console.log('max', max);
  const resultId = Object.keys(count).filter(
    (key: any) => count[key] === max
  );
  const getId = resultId.map(Number);
  console.log('id', getId);

  const { data, error } = useSWR('/api/items', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  // フィルターで購入回数の多い商品のみ取得
  const reccomendItem = data.filter(
    (e: Item) => getId.filter((f) => f === e.id).length > 0
  );
  console.log('rec', reccomendItem);

  return (
    <>
    <hr />
      <h2>おすすめ人気商品</h2>
      <div className={styles.itemWrapper}>
      {reccomendItem.map((item: Item) => {
        return (
          <div key={item.id} className={styles.card}>
          <div className={styles.item}>
          <Image src={item.image_path} alt={item.name} width={210} height={210}/>
          <Link href={`http://localhost:3000/items/${item.id}`}>
          <a>
          <p className={styles.text}>{item.name}</p>
          </a>
          </Link>
          <p>価格: {item.price}円</p>
          </div>
          </div>
        )
      })}
      </div>
    </>
  );
};

export default Reccomend;
