import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Order, Orderitem, Item } from '../types';
import styles from '../components/items.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Items from './menuList';

const fetcher: (args: string) => Promise<any> = (...args) =>
  fetch(...args).then((res) => res.json());

const History = () => {
  const [dataItem, setData] = useState<Order[]>();
  const [cookieId, setCookieId] = useState('');
  useEffect(() => {
    //購入データ取得
    const fetchData = async () => {
      const res = await fetch('/api/reccomend');
      const data = await res.json();
      setData(data.data);
    };
    fetchData();
    //cookie取得
    const cookies = document.cookie;
    const num = cookies.substring(cookies.indexOf('id='));
    const cookieArray = num.split('; ');
    setCookieId(cookieArray[0].slice(3));
  }, []);
  console.log('dataItem', dataItem);
  console.log('cookieId', Number(cookieId));

  //ログインユーザーのorder履歴取得
  const own = dataItem?.filter(
    (e: Order) => e.userId === Number(cookieId)
  );
  console.log('own', own);

  // {id: 1, userId: 1, status: 1, totalPrice: 2500, orderDate: '2022-09-08T07:24:28.306Z', …}
  //日付から文字列に変換する関数
  function getNowDateWithString() {
    var dt = new Date();
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth() + 1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    var result = y + '/' + m + '/' + d;
    return result;
  }
  return (
    <>
      {own?.map((e: Order) => {
        const date = new Date(e.orderDate);
        return (
          <div key={e.id}>
            <hr />
            <p>{date.toLocaleString()}</p>
            <div className={styles.itemWrapper}>
              {e.orderItemList.map((item: any): any => {
                return (
                  <div key={item.id} className={styles.card}>
                    <div className={styles.item}>
                      <Image
                        src={item.image_path}
                        alt={item.name}
                        width={210}
                        height={210}
                      />
                      <Link
                        href={`http://localhost:3000/items/${item.id}`}
                      >
                        <a>
                          <p className={styles.text}>{item.name}</p>
                        </a>
                      </Link>
                      <p>価格: {item.price}円</p>
                      <p>数量: {item.quantity}個</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default History;
