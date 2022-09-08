import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';
import { User } from '../../types';
import register from '../../styles/register.module.css';
import ItemlistLayout from '../../components/itemlistlayout';
import TimeAlert from '../../components/time_alert';

// ユーザ情報を取得
export const getStaticProps = async () => {
  const res = await fetch('http://localhost:8000/users');
  const users = await res.json();

  return {
    props: { users },
  };
};

// ユーザーのかたまりを型ガード
type Users = {
  users: User[];
};

const Register = ({ users }: Users) => {
  // フォームの入力値を取得
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

  // 登録情報を送信
  async function postEvent(e: any) {
    // 無効な入力値で送信されないために初めにキャンセルする
    e.preventDefault();

    // 登録済みのメールアドレスを取得し、重複してないかチェック
    function userEmails({ users }: Users) {
      const emailArr = users.map((user: User) => user.email);
      return emailArr.includes(email);
    }

    if (
      !name ||
      !email ||
      !email.match(/.+@.+\..+/) ||
      !zipcode ||
      !zipcode.match(/^[0-9]{3}-[0-9]{4}$/) ||
      !zipcode.match(/-/) ||
      !address ||
      !phoneNumber ||
      !phoneNumber.match(/^\d{2,4}-\d{3,4}-\d{4}$/) ||
      !phoneNumber.match(/-/) ||
      !password ||
      !(8 < password.length && password.length < 16) ||
      !confirmationPassword ||
      password === confirmationPassword
    ) {
      alert('入力エラーがあります');
      return;
    } else if (userEmails({ users })) {
      alert('そのメールアドレスはすでに使われています');
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
        id: 0,
        logined: false,
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
      Router.push('/users/login');
    }
  }

  // フォームの入力値をクリアにする
  function clearFormAll() {
    setName('');
    setEmail('');
    setAddress('');
    setPhoneNumber('');
    setZipcode('');
    setPassword('');
    setConfirmationPassword('');
    return;
  }

  // パスワード表示/非表示設定

  const [isRevealPassword, setIsRevealPassword] = useState(false);

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };

  return (
    <section>
      <Head>
        <title>ユーザ登録</title>
        <link
          href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
          rel="stylesheet"
        ></link>
      </Head>
      <ItemlistLayout />
      <form
        method="post"
        action="#"
        onSubmit={postEvent}
        className={register.registerForm}
      >
        <fieldset>
          <legend>ユーザ登録</legend>
          <div>
            <label htmlFor="name">
              名前:
              {!name && <span>名前を入力してください</span>}
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
              {!email && (
                <span>メールアドレスを入力してください</span>
              )}
              {!email.match(/.+@.+\..+/) && email.length >= 1 && (
                <span>メールアドレスの形式が不正です</span>
              )}
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
              郵便番号:
              {!zipcode && <span>郵便番号を入力してください</span>}
              {!zipcode.match(/^[0-9]{3}-[0-9]{4}$/) &&
                zipcode.length >= 1 && (
                  <span>
                    郵便番号はXXX-XXXXの形式で入力してください
                  </span>
                )}
              {!zipcode.match(/-/) && zipcode.length >= 1 && (
                <span> / -(ハイフン)を入力してください</span>
              )}
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
              住所:
              {!address && <span>住所を入力してください</span>}
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
              電話番号:
              {!phoneNumber && (
                <span>電話番号を入力してください</span>
              )}
              {!phoneNumber.match(/^\d{2,4}-\d{3,4}-\d{4}$/) &&
                phoneNumber.length >= 1 && (
                  <span>
                    電話番号はXXXX-XXXX-XXXXの形式で入力してください
                  </span>
                )}
              {!phoneNumber.match(/-/) && phoneNumber.length >= 1 && (
                <span> / -(ハイフン)を入力してください</span>
              )}
            </label>
            <div>
              <input
                type="tel"
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
              パスワード:
              {!password && <span>パスワードを入力してください</span>}
              {password.length < 8 && password.length >= 1 && (
                <span>
                  パスワードは８文字以上１６文字以内で設定してください
                </span>
              )}
              {password.length > 16 && (
                <span>
                  パスワードは８文字以上１６文字以内で設定してください
                </span>
              )}
            </label>
            <div className={register.inputPass}>
              <input
                type={isRevealPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChangePassword}
              />
              <div
                onClick={togglePassword}
                className={register.revealPass}
              >
                {isRevealPassword ? (
                  <i className="fas fa-eye" />
                ) : (
                  <i className="fas fa-eye-slash" />
                )}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="confirmationPassword">
              確認用パスワード:
              {!confirmationPassword && (
                <span>確認用パスワードを入力してください</span>
              )}
              {password !== confirmationPassword &&
                confirmationPassword.length >= 1 && (
                  <span>
                    パスワードと確認用パスワードが不一致です
                  </span>
                )}
            </label>
            <div className={register.inputPass}>
              <input
                type={isRevealPassword ? 'text' : 'password'}
                name="confirmationPassword"
                placeholder="Confirmation Password"
                id="confirmationPassword"
                value={confirmationPassword}
                onChange={onChangeConfirmationPassword}
              />
              <div
                onClick={togglePassword}
                className={register.revealPass}
              >
                {isRevealPassword ? (
                  <i className="fas fa-eye" />
                ) : (
                  <i className="fas fa-eye-slash" />
                )}
              </div>
            </div>
          </div>
          <div>
            <button type="submit">登録</button>
            <button type="reset" onClick={clearFormAll}>
              クリア
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default Register;
