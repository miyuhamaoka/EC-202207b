import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import layoutStyle from '../styles/layout.module.css';

const Layout = () => {
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
            <Link href='#'>
              <a>ショッピングカート</a>
            </Link>
          </li>
          <li>
            <Link href='../users/login'>
              <a>ログイン</a>
            </Link>
          </li>
          <li>
            <Link href='#'>
              <a>ログアウト</a>
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Layout;
