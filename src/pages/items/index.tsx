import Head from 'next/head';
import Link from 'next/Link';
import Items from '../../components/ItemList';
//import { Layout } from '../components/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>ラクラクカフェ！</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/">
        <a>商品一覧</a>
      </Link>
      <Link href="/users/index">
        <a>ログイン</a>
      </Link>
      <Link href="/users/register">
        <a>新規登録画面</a>
      </Link>
      <Link href="/items/order_comfirm">
        <a>注文履歴</a>
      </Link>

      <div>
        <Items></Items>
      </div>
    </>
  );
}
