
import Checkout from '../../components/checkout';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';


const cookie = () => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie;
    console.log('id', cookies);
    const cookieArray = cookies.split('; ');
    console.log('need', cookieArray[0].slice(3));
    return Number(cookieArray[0].slice(3));
  }
};

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:8000/cartItems/${cookie()}`);
  const data = await res.json();
  const items = data.items
  console.log('data', items)
  if (!data) {
    return { notFound: true };
  } else {
    return {
      props: { items },
    };
  }
}

const OrderConfirm = ({ items }: any) => {

  const itemtotal = items.map((e: any) => e.subtotal);
  const total = itemtotal.reduce((a: number, b: number) => a + b);


  return (
    <>
      <Head>
        <title>注文確認画面</title>
      </Head>
      <h1>注文内容確認</h1>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>商品</th>
            <th>価格</th>
            <th>数量</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          {items.map((n: any) => {
            const subtotal = n.price * n.quantity;
            return (
              <tr key={n.id}>
                <td>{n.name}</td>
                <td>
                  <Image
                    src={n.image_path}
                    width="30px"
                    height="30px"
                    alt={n.description}
                  />
                </td>
                <td>{n.price}円</td>
                <td>{n.quantity}個</td>
                <td>{subtotal}円</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>消費税：{Math.round(total * 0.08).toLocaleString()}円</p>
      <p>
        ご注文金額合計：{Math.round(total * 1.08).toLocaleString()}
        円（税込）
      </p>
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