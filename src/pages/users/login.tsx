import { NextPage } from "next";
import { useForm } from "react-hook-form";
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from "react";



export const LoginLayout = () => {

  return (
    <>
      <Head>
        <title>rakucafeログイン画面</title>
      </Head>
      <body>
        <div className="container">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                  aria-expanded="false"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>{' '}
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">
                  <img
                    alt="main log"
                    src="/header_logo.png"
                    height="35"
                  />
                </a>
              </div>

              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <p className="navbar-text navbar-right">
                  <Link href="./cart" className="navbar-link">
                    ショッピングカート
                  </Link>
                  &nbsp;&nbsp;
                </p>
              </div>
            </div>
          </nav>

          <div className="row">
            <div className="text-center">
              <Link href="users/register">ユーザ登録はこちら</Link>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};


export const LoginPage =()=>{
const[email,setEmail]=useState("");
const[pass,setPass]=useState("");
const router =useRouter();

const emailInput=(e:any)=>{
setEmail(e.target.value);
}
const passInput=(e:any)=>{
setPass(e.target.value);
}

// フェッチ
// fetch('/api/items', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({

//   }),
// }).then((res) => {
//   console.log(res.status);
//   if (res.status == 201) {
//     return router.push('/');
//   }
// });

  return(
    <div className="row">
    <div className="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8 col-sm-10 col-xs-12">
      <div className="well">
        <form method="post" action="item_list_pizza.html" >
          <fieldset>
            <legend>ログイン</legend>
            <label
              className="control-label"
              style={{color: 'red'}}
              htmlFor="inputError"
            >
              メールアドレス、またはパスワードが間違っています
            </label>
            <div className="form-group">
              <label htmlFor="inputEmail">メールアドレス:</label>
              <input
                onChange={emailInput}
                type="text"
                id="inputEmail"
                value={email}
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">パスワード:</label>
              <input
                onChange={passInput}
                type="text"
                id="inputPassword"
                value={pass}
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                ログイン
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
  )
}

export default LoginLayout;


