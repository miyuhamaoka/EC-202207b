import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';
import Layout from '../../components/layout';
import { User } from '../../types';

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:8000/users');
  const users = await res.json();

  return {
    props: { users }
  };
};

type Users = {
  users: User[]
};

const Register = ({ users }: Users) => {
  const [name, setName] = useState('');
  const onChangeName = (e: any) => setName(e.target.value);

  const [email, setEmail] = useState('');
  const onChangeEmail = (e: any) => setEmail(e.target.value);

  const [zipcode, setZipcode] = useState('');
  const onChangeZipcode = (e: any) => setZipcode(e.target.value);

  const [address, setAddress] = useState('');
  const onChangeAddress = (e: any) => setAddress(e.target.value);

  const [phoneNumber, setPhoneNumber] = useState('');
  const onChangePhoneNumber = (e: any) =>
    setPhoneNumber(e.target.value);

  const [password, setPassword] = useState('');
  const onChangePassword = (e: any) => setPassword(e.target.value);

  const [confirmationPassword, setConfirmationPassword] =
    useState('');
  const onChangeConfirmationPassword = (e: any) =>
    setConfirmationPassword(e.target.value);

  async function postEvent(e: any) {
    e.preventDefault();

    const zipcodePattern = /^[0-9]{3}-[0-9]{4}$/;
    const telephonePattern = /^\d{3,4}-\d{3,4}-\d{4}$/;
    const emailPattern = /.+@.+\..+/;

    function userEmails ({ users }: Users) {
      const emailArr = users.map((user: User) => user.email)
      return emailArr.includes(email);
    };

    if (!name) {
      alert('名前を入力して下さい');
      return;
    }
    else if (!email) {
      alert('メールアドレスを入力して下さい');
      return;
    }
    else if (userEmails({ users })) {
      alert('そのメールアドレスはすでに使われています');
      return;
    }
    else if (!emailPattern.test(email)) {
      alert('メールアドレスの形式が不正です');
      return;
    }
    else if (!zipcode) {
      alert('郵便番号を入力して下さい');
      return;
    }
    else if (!zipcodePattern.test(zipcode)) {
      alert('郵便番号はXXX-XXXXの形式で入力してください');
      return;
    }
    else if (!address) {
      alert('住所を入力して下さい');
      return;
    }
    else if (!phoneNumber) {
      alert('電話番号を入力して下さい');
      return;
    }
    else if (!telephonePattern.test(phoneNumber)) {
      alert('電話番号はXXXX-XXXX-XXXXの形式で入力してください');
      return;
    }
    else if (!password) {
      alert('パスワードを入力して下さい');
      return;
    }
    else if (16 < password.length) {
      alert('パスワードは８文字以上１６文字以内で設定してください');
      return;
    }
    else if (password.length < 8) {
      alert('パスワードは８文字以上１６文字以内で設定してください');
      return;
    }
    else if (!confirmationPassword) {
      alert('確認用パスワードを入力して下さい');
      return;
    }
    else if (password !== confirmationPassword) {
      alert('パスワードと確認用パスワードが不一致です');
      return;
    }
    else {
      const postParam: User = {
        name: name,
        email: email,
        password: password,
        confirmationPassword: confirmationPassword,
        zipcode: zipcode,
        address: address,
        telephone: phoneNumber,
        id: 0,
        logined: false
      };

      const parameter = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postParam),
      };

      const result = await fetch(
        'http://localhost:8000/users',
        parameter
      ).then((res) => {
        return res.json();
      });

      console.log(result);
      Router.push('/users');
    }
  };

  function clearFormAll() {
    setName('');
    setEmail('');
    setAddress('');
    setPhoneNumber('');
    setZipcode('');
    setPassword('');
    setConfirmationPassword('');
    return;
  };

  return (
    <section>
      <Head>
        <title>ユーザ登録</title>
      </Head>
      <Layout></Layout>
      <form method="post" action="#" onSubmit={postEvent}>
        <fieldset>
          <legend>ユーザ登録</legend>
          <div>
            <label htmlFor="name">
              名前:<span>名前を入力してください</span>
            </label>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Name"
                id="name"
                value={name}
                onChange={onChangeName}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email">
              メールアドレス:
              <span>メールアドレスを入力してください</span>
            </label>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChangeEmail}
              />
            </div>
          </div>
          <div>
            <label htmlFor="zipcode">
              郵便番号:<span>郵便番号を入力してください</span>
            </label>
            <div>
              <input
                type="text"
                name="zipcode"
                placeholder="Zipcode"
                id="zipcode"
                value={zipcode}
                onChange={onChangeZipcode}
              />
            </div>
          </div>
          <div>
            <label htmlFor="address">
              住所:<span>住所を入力してください</span>
            </label>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Adress"
                id="address"
                value={address}
                onChange={onChangeAddress}
              />
            </div>
          </div>
          <div>
            <label htmlFor="phoneNumber">
              電話番号:<span>電話番号を入力してください</span>
            </label>
            <div>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Number"
                id="phoneNumber"
                value={phoneNumber}
                onChange={onChangePhoneNumber}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password">
              パスワード:<span>パスワードを入力してください</span>
            </label>
            <div>
              <input
                type="text"
                name="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmationPassword">
              確認用パスワード:
              <span>確認用パスワードを入力してください</span>
            </label>
            <div>
              <input
                type="text"
                name="confirmationPassword"
                placeholder="Confirmation Password"
                id="confirmationPassword"
                value={confirmationPassword}
                onChange={onChangeConfirmationPassword}
              />
            </div>
          </div>
          <div>
            <button type="submit">登録</button>
            <button type="reset" onClick={clearFormAll}>クリア</button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default Register;
