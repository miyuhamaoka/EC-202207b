import Head from 'next/head';
import Link from 'next/link';
import { CartItem } from '../../types';

export async function getServerSideProps({ query }: any) {
  console.log(
    'URL',
    `http://localhost:8000/cartItems?userId=${query.userId}`
  );
  const res = await fetch(
    `http://localhost:8000/cartItems?userId=${query.userId}` //クエリパラメーターのuserId取り出す
  );
  const cartItems = await res.json();

  //elseはユーザー登録したことない人
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

const CartPage = ({
  cartItem,
}: {
  cartItem: CartItem;
}) => {
  console.log('アイテム', cartItem);

  //cartItemsのitemsから削除ボタンが押されたitemIdの商品を除いてcartitemをbodyにセットする
  //(idが一致したものを削除?)
  const onClickDelete = async(itemId:number) => {
    const parameter = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cartItem
        })
      };

    //   const delete = [];

     const response =  await fetch(`http://localhost:8000/cartItems/${cartItem.id}`, parameter)
     console.log(await response.json);
    }

    // return fetch(`http://localhost:8000/cartItems?userId=${userId}`, {
    //   method: 'PATCH',
    //   body: JSON.stringify(cartItem),
    // });
//   };


//消費税と商品合計に使用する価格の合計を取得
  const itemPrice = cartItem.items.map((e:any) => e.price)
  const total = itemPrice.reduce((a: number, b: number) => a + b);
  console.log('アイテム', itemPrice);
  console.log(total);

  //商品の表示
  return (
    <>
      <Head>
        <title>ショッピングカート</title>
      </Head>
      <h1>ショッピングカート</h1>

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
          {cartItem.items.map((item : any) => (
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
          };

export default CartPage;

//ショッピングカート

//削除ボタン


//「注文に進む」ボタン

// 追加(商品詳細画面)・削除ボタンで使う？
// fetch (`http://localhost:8000/cartItems?userId=${userId}`, {
//     method:'PATCH',
//     body: JSON.stringify({
//         name: "",
//         description: "",
//         price: 0,
//         imagePath: "",
//     }),
// });
