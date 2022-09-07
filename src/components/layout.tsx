import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import layoutStyle from '../styles/layout.module.css';
// import LogoutBtn from '../pages/users/logout';
import { GetStaticProps } from 'next';
import { User } from '../types';
import Logout from '../pages/users/logout';



export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:8000/users');
  const users = (await response.json());
  return {
    props: { users },
    revalidate: 5,
  };
};

const Layout = ({users}:any) => {
  

  return (
    <div className={layoutStyle.body}>
      <header className={layoutStyle.header}>
        <div className={layoutStyle.logo}>
          <Link href="/items">
            <a >
              <Image
                src="/../public/header_logo.png"
                className={layoutStyle.img}
                height={70}
                width={180}
                alt="ロゴ"
              />
            </a>
          </Link>
        </div>
        <ul className={layoutStyle.link}>
          <li>
            <Link href='../items/cart'>
              <a>ショッピングカート</a>
            </Link>
          </li>
          <li>
            <Link href='../users/login'>
              <a>ログイン</a>
            </Link>
          </li>
          <li>
          <Logout/>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Layout;
