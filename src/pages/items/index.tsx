import Head from 'next/head';
import Link from 'next/Link';
import Items from '../../components/ItemList';
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
        <a rel="icon" href="favicon.ico" />
      </Head>
      <ItemlistLayout />
    {cookiesArray.map((cookie)=>{
      const cookieArray = cookie.split('=');

      if ( cookieArray[0] === ' name') {
        return(
          // eslint-disable-next-line react/jsx-key
          <p className={styles.hello}>{`こんにちは${cookieArray.slice(1)}`}さん</p>
          )
        }
      })}
      <div>
        <Items></Items>
      </div>
    </>
  );

}