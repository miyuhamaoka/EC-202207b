import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect } from 'react';
import { useState } from 'react';
import Layout from '../../components/layout';
import Head from 'next/head';
import cartStyle from '../../styles/cart.module.css';
import Styles from '../../components/items.module.css'
import Reccomend from '../../components/reccomend';

const LogoutCart = () => {
  const router = useRouter();
  const [logoutCartItems, setLogoutCartItems] = useState([]);

  useEffect(() => {
    if (localStorage && localStorage.logoutCartItems) {
      setLogoutCartItems(JSON.parse(localStorage.logoutCartItems));
    }
  }, []);

  const logoutItemPrice = logoutCartItems.map((e: any) => e.subtotal);
  const logoutTotal = logoutItemPrice.reduce(
    (a: number, b: number) => a + b,
    0
  );

  const onClickDelete = (index: number) => {
    const itemsArray = JSON.parse(
      localStorage.getItem('logoutCartItems')!
    );
    console.log('item', itemsArray);
    console.log('index', index);
    itemsArray.splice(index, 1);
    console.log('new', itemsArray);
    localStorage.removeItem('logoutCartItem');
    localStorage.setItem(
      'logoutCartItems',
      JSON.stringify(itemsArray)
    );
  };

  const judgeCookie = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    document.cookie = `url=/items/order_confirm;path=/;expires=${date};`;
  };

  if (logoutCartItems.length === 0) {
    return (
      <>
        <Head>
          <title>ショッピングカート（未ログイン）</title>
        </Head>
        <Layout />
        <p>カートにアイテムがありません</p>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>ショッピングカート（未ログイン）</title>
        </Head>
        <Layout />
        <div className={cartStyle.tbody}>
        <h1>ショッピングカート</h1>
        <h2>***ログインが必要です***</h2>
        <table className={cartStyle.table}>
          <thead className={cartStyle.thead}>
            <tr className={cartStyle.tr}>
              <th className={cartStyle.th}>商品名</th>
              <th className={cartStyle.th}>価格（税抜）</th>
              <th className={cartStyle.th}>数量</th>
              <th className={cartStyle.th}>オプション</th>
              <th className={cartStyle.th}>小計</th>
            </tr>
          </thead>
          <tbody>
            {logoutCartItems.map((item: any, index) => (
              <tr key={item.id} className={cartStyle.tr}>
                <td className={cartStyle.th}>
                  <Image
                    src={item.image_path}
                    width={100}
                    height={100}
                    alt={item.name}
                  />
                  {item.name}
                </td>
                <td className={cartStyle.th}>{item.price.toLocaleString()}円</td>
                <td className={cartStyle.th}>{item.quantity}個</td>
                <td className={cartStyle.th}>
                      {item.options.map((option: any) => (
                        <>
                          <p key={option.id}>{option.name}</p>
                          <span>{option.price.toLocaleString()}円</span>
                        </>
                      ))}
                    </td>
                <td className={cartStyle.th}>{item.subtotal}円</td>
                <td>
                  {
                    <button
                      type="button"
                      onMouseDown={() => onClickDelete(index)}
                      onClick={() => location.reload()}
                      className={cartStyle.dbtn}
                    >
                      削除
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div  className={cartStyle.price}>
        <h3>
          消費税:{Math.round(logoutTotal * 0.08).toLocaleString()}円
        </h3>
        <h2>
          ご注文金額合計:
          {Math.round(logoutTotal * 1.08).toLocaleString()}
          円（税込）
        </h2>
        </div>
        <button
          type="button"
          onClick={() => {
            judgeCookie();
            router.push('/users/login');
          }}
          className={Styles.btn}
        >
          ログイン画面に進む
        </button>
        </div>
        <Reccomend />
      </>
    );
  }
};

export default LogoutCart;
