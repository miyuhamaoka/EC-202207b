import Head from 'next/head';
import React, { useState } from 'react';
import { User } from '../../types';

const Register = () => {
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

    if (!name) {
      alert('名前を入力して下さい');
      return;
    } else {
      const postParam: User = {
        name: name,
        email: email,
        password: password,
        confirmationPassword: confirmationPassword,
        zipcode: zipcode,
        address: address,
        telephone: phoneNumber,
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
    }
  };

  return (
    <section>
      <Head>
        <title>ユーザ登録</title>
      </Head>
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
            <button type="reset">クリア</button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default Register;
