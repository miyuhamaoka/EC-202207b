import Head from 'next/head';
import Link from 'next/Link';
import Items from '../../components/itemList';
import Layout from '../../components/layout';
import {User} from '../../types'
// import {GetStaticPaths} from 'next';
// import { GetStaticProps } from 'next';
import { useState,useEffect } from 'react';


export default function Home() {
  const [cookiesArray,setCookiesArray]:[string[],Function]=useState();
  useEffect(()=>{
    const cookies = document.cookie;
    const array = cookies.split(';');
    setCookiesArray(array)
  },[])

  return (
    <>
      <Head>
        <title>ラクラクカフェ！</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
    {cookiesArray.map((cookie)=>{
      const cookieArray = cookie.split('=');
      if ( cookieArray[0] === ' name') {
        return(
          // eslint-disable-next-line react/jsx-key
          <p>{`こんにちは${cookieArray.slice(1)}`}さん</p>
          )
        }
      })}
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


