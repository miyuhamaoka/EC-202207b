import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect } from 'react';
import { useState } from 'react';

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
    return <p>カートにアイテムがありません</p>;
  } else {
    return (
      <>
        <h1>カート商品</h1>
        <h2>ログインが必要です</h2>
        <table>
          <thead>
            <tr>
              <th>商品名</th>
              <th>価格（税抜）</th>
              <th>数量</th>
              <th>小計</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
            {logoutCartItems.map((item: any, index) => (
              <tr key={item.id}>
                <td>
                  <Image
                    src={item.image_path}
                    width={100}
                    height={100}
                    alt={item.name}
                  />
                  {item.name}
                </td>
                <td>{item.price}円</td>
                <td>{item.quantity}個</td>
                <td>{item.subtotal}円</td>
                <td>
                  {
                    <button
                      type="button"
                      onMouseDown={() => onClickDelete(index)}
                      onClick={() => location.reload()}
                    >
                      削除
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>
          消費税:{Math.round(logoutTotal * 0.08).toLocaleString()}円
        </h3>
        <h2>
          ご注文金額合計:
          {Math.round(logoutTotal * 1.08).toLocaleString()}
          円（税込）
        </h2>
        <br />
        <button
          type="button"
          onClick={() => {
            judgeCookie();
            router.push('/users/login');
          }}
        >
          ログインに進む
        </button>
      </>
    );
  }
};

export default LogoutCart;
