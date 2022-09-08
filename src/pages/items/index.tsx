import Head from 'next/head';
import Link from 'next/link';
import Items from '../../components/menuList';
import Layout from '../../components/layout';
import ItemlistLayout from '../../components/itemlistlayout';
import {User} from '../../types'
import { useState,useEffect } from 'react';
import  styles  from '../../components/items.module.css';

export default function Home() {

  const [cookiesArray,setCookiesArray]:[string[],Function]=useState([]);
  useEffect(()=>{
    const cookies = document.cookie;
    const array = cookies.split(';');
    if(array!==undefined){
      setCookiesArray(array)
    }
  },[])
  return (
    <>
      <Head>
        <title>RakurakuCoffee</title>
      </Head>

    <ItemlistLayout />
    <div className={styles.stylebody}></div>
    {cookiesArray.map((cookie)=>{
      const cookieArray = cookie.split('=');
      if ( cookieArray[0] === ' name') {
        return(
          // eslint-disable-next-line react/jsx-key
          <p key={cookiesArray[0]} className={styles.hello}>{`こんにちは${cookieArray.slice(1)}`}さん</p>
          )
        }
      })}
      <div>
        <Items></Items>
      </div>
    </>
  );
}
