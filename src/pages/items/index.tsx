import Head from 'next/head';
import Link from 'next/Link';
import Items from '../../components/itemList';
import Layout from '../../components/layout';
import { User } from '../../types';
// import {GetStaticPaths} from 'next';
// import { GetStaticProps } from 'next';
import { useState } from 'react';

export default function Home() {
  const CookieWatch: any = () => {
    if (typeof document !== undefined) {
      `ログインをしてください`;
    } else {
      const cookies = document.cookie;
      console.log('id', cookies);
      const cookiesArray = cookies.split('; ');
      cookiesArray.map((cookie) => {
        const cookieArray = cookie.split('=');
        return (
          // eslint-disable-next-line react/jsx-key
          `こんにちは${cookieArray.slice(1)}}さん`
        );
      });
    }
  };

  return (
    <>
      <Layout />
      <CookieWatch />
      <Head>
        <title>ラクラクカフェ！</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/items">
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
