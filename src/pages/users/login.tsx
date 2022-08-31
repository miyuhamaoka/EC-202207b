// 途中
// JSONがおかしくなる：エラー
// エラー時対応

import { SyntheticEvent, useState } from 'react';
import { User } from '../../types';
import Link from 'next/link';
import fetch from 'unfetch';
import { useRouter } from 'next/router';
import Head from 'next/head';
// import { Layout } from '../../component/layout';
// import styles from '../../styles/login.module.css';

export default function Login() {
  const [data, setData] = useState({ mail: '', pass: '' });
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  async function OnCkickHandle(e: SyntheticEvent) {
    e.preventDefault();
    const response: any = await fetch(
      `http://localhost:8000/users?email=${data.mail}&password=${data.pass}`
    );
    const users = await response.json();

    // サイズが１だったらok

    if (users.length === 1) {
      const user = users[0];
      user.logined = true;
      const date = new Date();
      document.cookie = `id=${
        user.id
      }; expires=Thu, expires=${date.setDate(
        date.getDate() + 1
      )} path=/;`;
      return fetch(`http://localhost:8000/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
        .then((res) => {
          console.log(res.status);
          return router.push('/');
        })
        .catch((err) => {
          console.log('エラー');
        });
    } else {
      alert('入力内容の確認をしてください');
    }
  }

  return (
    <>
      {/* スタイルコンポーネント入れる */}
    
        <form onSubmit={(e) => OnCkickHandle(e)}>
          <h1 >ログイン</h1>
          <div>
            <div>
              <label>メールアドレス：</label>
              <input
                type="email"
                placeholder="Email"
                name="mail"
                id="email"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label>パスワード：</label>
              <input
                type="password"
                placeholder="Password"
                name="pass"
                id="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button>ログイン</button>
          </div>
        </form>
        <Link href="./create">
          <a>ユーザ登録はこちら</a>
        </Link>
   
    </>
  );
}
