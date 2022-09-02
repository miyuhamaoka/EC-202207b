import Checkout from '../../components/checkout'
import Head from 'next/head'; 
import Link from 'next/Link';

const OrderConfirm = () => {
  return (
    <>
      <Head>
        <title>注文確認画面</title>
      </Head>
      <p>aaa</p>




<div>
<Checkout></Checkout>
</div>

 <button>
<Link href="/items/order_checkouted">
    <a>この内容で注文する</a>
</Link>
</button>
</>
  )}

  export default OrderConfirm;
