// TODO ログアウト時のカート商品がある場合は、注文画面へ遷移する

import { SyntheticEvent, useState } from 'react';
import Link from 'next/link';
// import fetch from 'unfetch';
import { useRouter } from 'next/router';
import loginStyle from '../../styles/login.module.css';
import Image from 'next/image';
import layoutStyle from '../../styles/layout.module.css';
import Layout from '../../components/layout';

const combine = async () => {
  const cookie = () => {
    const cookies = document.cookie;
    console.log('id', cookies);
    const num = cookies.substring(cookies.indexOf('id='));
    console.log('num', num);
    const cookieArray = num.split('; ');
    console.log('array', cookieArray);
    return Number(cookieArray[0].slice(3));
  };
  console.log('cookie', cookie());
  const localItem = JSON.parse(
    localStorage.getItem('logoutCartItems')!
  );
  const res = await fetch(
    `http://localhost:8000/cartItems?userId=${cookie()}`
  );
  const data = await res.json();
  return fetch(`http://localhost:8000/cartitems/${data[0].id}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      items: [...data[0].items, ...localItem],
    }),
  });
};

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

    if (users.length === 1) {
      const user = users[0];
      user.logined = true;
      return (
        fetch(`http://localhost:8000/users/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        })
          .then((res) => {
            console.log(res.status);
            if (typeof document !== 'undefined') {
              const date = new Date();
              date.setDate(date.getDate() + 1); //秒や分
              document.cookie = `id=${user.id};path=/;expires=${date};`;
              document.cookie = `name=${user.name};path=/;expires=${date};`;
            }
            console.log(document.cookie);
            const cookies = document.cookie;
            if (cookies.indexOf('url=') === -1) {
              return router.push('/items');
            } else {
              combine();
              const num = cookies.substring(cookies.indexOf('url='));
              const cookieArray = num.split('; ');
              const path = cookieArray[0].slice(4);
              return router.push(path);
            }
          })
          // if (document.cookie) {
          //   const cookies = document.cookie;
          //   console.log('id', cookies);
          //   const num = cookies.substring(cookies.indexOf('id='));
          //   console.log('num', num);
          //   const cookieArray = num.split('; ');
          //   console.log('array', cookieArray);
          //   return Number(cookieArray[0].slice(3));
          // }

          .catch((err) => {
            console.log('エラー');
          })
      );
    } else {
      alert('入力内容の確認をしてください');
    }
  }

  return (
    <>
      <Layout />
      <div className={loginStyle.primary}>
        <form
          className={loginStyle.contactform}
          onSubmit={(e) => OnCkickHandle(e)}
        >
          <h2>ログイン</h2>
          <div>
            <div className={loginStyle.lavel}>
              <input
                className={loginStyle.forminput}
                type="email"
                placeholder="Email"
                name="mail"
                id="email"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className={loginStyle.lavel}>
              <input
                className={loginStyle.forminput}
                type="password"
                placeholder="Password"
                name="pass"
                id="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button className={loginStyle.loginbtn}>ログイン</button>
          </div>
        </form>
        <Link href="./register">
          <a className={loginStyle.userregister}>
            ユーザ登録はこちら
          </a>
        </Link>
      </div>
    </>
  );
}
