
//ショッピングカート

import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { CartItem } from '../../types';
import Layout from '../../components/layout';

export async function getServerSideProps({ query }: any) {
  // console.log(
  //   'URL',
  //   `http://localhost:8000/cartItems?userId=${query.userId}`
  // );
  const res = await fetch(
    `http://localhost:8000/cartItems?userId=${query.userId}` //クエリパラメーターのuserId取り出す
  );
  const cartItems = await res.json();
  
  //length=1は登録してある(買い物したことある)人。カートの[0]番目を持ってくる
  //elseはユーザー登録したことない人は[]を用意
  let cartItem: Omit<CartItem, 'id'>;

  if (cartItems.length === 1) {
    cartItem = cartItems[0];
  } else {
    cartItem = { userId: parseInt(query.userId), items: [] };
  }

  return {
    props: { cartItem: cartItem },
  };
}

const CartPage = ({ cartItem }: { cartItem: CartItem }) => {
  // console.log('アイテム', cartItem);

  //cartItemsのitemsから削除ボタンが押されたitemIdの商品を除いてcartitemをbodyにセットする
  //(idが一致したものを削除?)
  const onClickDelete = async (itemId: number) => {

    //cartItemsのitemsのitemIdだけ抜く
    const restItems = cartItem.items.filter(item => item.id !== itemId);

    const body = {
      id: cartItem.id,
      userId: cartItem.userId,
      items: restItems
    };
    // console.log(restItems);

    const parameter = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    };


    const response = await fetch(
      `http://localhost:8000/cartItems/${cartItem.id}`,
      parameter
    );
    console.log(response.json);

    //削除後遷移
    Router.push(`/items/cart?userId=${cartItem.userId}`)
  };


  //消費税と商品合計に使用する価格の合計を取得 (商品無くなったら0がセットされる)
  const itemPrice = cartItem.items.map((e: any) => e.price);
  const total = itemPrice.reduce((a: number, b: number) => a + b,0);

  //商品の表示
  //カートに商品がある時ない時(ない時はlength0でタグ非表示)
  function Render() {
    if (cartItem.items.length > 0) {
      return (
        <>
        <table>
        <thead>
          <tr>
            <th>商品名</th>
            <th>価格（税抜）</th>
            <th>数量</th>
            <th>小計</th>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {cartItem.items.map((item: any) => (
            <tr key={item.id}>
              <td>
                {/* <img src='' /> */}
                <p>{item.image_path}</p>
                <p>{item.name}</p>
              </td>
              <td>{item.price}円</td>
              <td>{item.quantity}個</td>
              <td>{item.price}円</td>

              <td>
                <button onClick={() => onClickDelete(item.id)}>
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>消費税:{total * 0.08}円</h3>
      <h2>ご注文金額合計:{total * 1.08}円（税込）</h2>

      <Link href="/items/order_comfirm">
        <button type="button">注文に進む</button>
      </Link>
      </>
      );
    } else {
      return (
        <p>カートに商品がありません</p>
      );
    }
  }
 
  return (
    <>
      <Head>
        <title>ショッピングカート</title>
      </Head>
      <Layout />
      <h1>ショッピングカート</h1>

      <Render />

    </>
  );
};

export default CartPage;

