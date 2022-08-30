import { useState } from 'react';
import { User } from '../../types';
import Link from 'next/link';
import useSWR, { useSWRConfig } from 'swr';
import fetch from 'unfetch';
import { useRouter } from 'next/router';
import Head from 'next/head';

// // SWR?
// const fetcher = () => fetch(`http://localhost:8000/users/`).then(res => res.json())

// export function LoginApp () {
//   const { data, error } = useSWR('http://localhost:8000/users/', fetcher)

// }
// useSWR('/api/todos', fetcher, { refreshInterval: 1000 })

export default function Login() {
  const [data, setData] = useState({ mail: '', pass: '' });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function onCkickHandle() {
    const users = await UserInformation();
    users.map(
      (user: {
        id: number;
        email: string;
        password: string;
        logined: boolean;
      }) => {
        if (user.email === data.mail && user.password === data.pass) {
          user.logined = true;
        }
      }
    );
    return fetch('http://localhost:8000/users', {
      method: 'PUT',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' , referrer: "" ,},
      body: JSON.stringify(users),
    });
  }

  return (
    <>
      <Head>
        <title>rakucafeログイン画面</title>
      </Head>
      <a className="navbar-brand" href="/">
        <img alt="main log" src="/header_logo.png" height="35" />
      </a>
      <div
        className="collapse navbar-collapse"
        id="bs-example-navbar-collapse-1"
      >
        <p className="navbar-text navbar-right">
          <Link href="../items/cart" className="navbar-link">
            ショッピングカート
          </Link>
          &nbsp;&nbsp;
        </p>
      </div>
      <form>
        <h1>ログイン</h1>
          <p>メールアドレス、またはパスワードが間違っています</p>
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
              <button onClick={() => onCkickHandle()}>
                ログイン
              </button>
        </div>
      </form>

      <Link href="./create">
        <a>ユーザ登録はこちら</a>
      </Link>
    </>
  );
}

export async function UserInformation() {
  return fetch(`http://localhost:8000/users/`)
    .then((response) => response.json())
    .then((data) => {
      return data.map((data: User) => {
        return {
          user: {
            id: data.id,
            email: data.email,
            password: data.password,
            logined: data.logined,
          },
        };
      });
    });
}
// import { NextPage } from 'next';
// import { useForm } from 'react-hook-form';
// import Head from 'next/head';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import fs from 'fs';
// import Cookie from 'js-cookie';
// import type { NextApiRequest, NextApiResponse } from 'next'

// export type User = {
//   email: string
//   email_verified: boolean
//   password:string
// }

// export  function Login() {
//   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   async function handleLogin(e:any) {
//     e.preventDefault()

//     try {
//       await nhost.auth.login({ email, password })
//     } catch (error) {
//       console.error(error)
//       return alert('failed to login')
//     }

//     router.push('/')
//   }

//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <div>
//           <input
//             placeholder="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <input
//             placeholder="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div>
//           <button type="submit">Login</button>
//         </div>
//       </form>

//       <div>
//         <Link href="/register">Register</Link>
//       </div>
//     </div>
//   )
// }

// export const login = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     await auth0.handleLogin(req, res)
//   } catch (error) {
//     console.error(error)
//     const errorMessage =
//       error instanceof Error ? error.message : 'Internal server error'
//     res.status(500).end(errorMessage)
//   }
// }

// export const LoginLayout = () => {
//   return (
//     <>
//       <Head>
//         <title>rakucafeログイン画面</title>
//       </Head>
//       <body>
//         <div className="container">
//           <nav className="navbar navbar-default">
//             <div className="container-fluid">
//               <div className="navbar-header">
//                 <button
//                   type="button"
//                   className="navbar-toggle collapsed"
//                   data-toggle="collapse"
//                   data-target="#bs-example-navbar-collapse-1"
//                   aria-expanded="false"
//                 >
//                   <span className="sr-only">Toggle navigation</span>
//                   <span className="icon-bar"></span>{' '}
//                   <span className="icon-bar"></span>
//                   <span className="icon-bar"></span>
//                 </button>
//                 <a className="navbar-brand" href="/">
//                   <img
//                     alt="main log"
//                     src="/header_logo.png"
//                     height="35"
//                   />
//                 </a>
//               </div>

//               <div
//                 className="collapse navbar-collapse"
//                 id="bs-example-navbar-collapse-1"
//               >
//                 <p className="navbar-text navbar-right">
//                   <Link href="./cart" className="navbar-link">
//                     ショッピングカート
//                   </Link>
//                   &nbsp;&nbsp;
//                 </p>
//               </div>
//             </div>
//           </nav>

//           <div className="row">
//             <div className="text-center">
//               <Link href="users/register">ユーザ登録はこちら</Link>
//             </div>
//           </div>
//         </div>
//       </body>
//     </>
//   );
// };

// export const LoginPage = () => {
//   // const [email, setEmail] = useState('');
//   // const [pass, setPass] = useState('');

//   const [data, setData] = useState({ email: '', pass: '' });

//   // const handleLogin=()=>{
//     //   login(data.email,data.pass)
//     //   .then((res)=>{
//       //     appContext.setUser(res.data.user)
//       //   }).catch((err)=>console.log(err));
//       // }

//       const handleChange = (e: any) => {
//         setData({ ...data, [e.target.name]: e.target.value });
//       };

//       const Signin:any = (email: any, pass: any) => {
//         const router = useRouter();
//         fetch('http://localhost:8000/users/login', {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email,
//             pass,
//           }),
//           credentials: 'same-origin',
//         })
//           .then((res: any) => {
//             Cookie.set('token', res.data.jwt, { expires: 7 });
//             return router.push('/');
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//           return;
//       };
//       return (
//         <div className="row">
//       <div className="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8 col-sm-10 col-xs-12">
//         <div className="well">
//           <form method="post" action="item_list_pizza.html" onSubmit={Signin}>
//             <fieldset>
//               <legend>ログイン</legend>
//               <label
//                 className="control-label"
//                 style={{ color: 'red' }}
//                 htmlFor="inputError"
//               >
//                 メールアドレス、またはパスワードが間違っています
//               </label>
//               <div className="form-group">
//                 <label htmlFor="inputEmail">メールアドレス:</label>
//                 <input
//                   onChange={(e) => handleChange(e)}
//                   type="text"
//                   id="inputEmail"
//                   name="email"
//                   className="form-control"
//                   placeholder="Email"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="inputPassword">パスワード:</label>
//                 <input
//                   onChange={(e) => handleChange(e)}
//                   type="text"
//                   name="pass"
//                   id="inputPassword"
//                   className="form-control"
//                   placeholder="Password"
//                 />
//               </div>
//               <div className="form-group">
//                 <button type="submit" className="btn btn-primary">
//                   ログイン
//                 </button>
//               </div>
//             </fieldset>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
