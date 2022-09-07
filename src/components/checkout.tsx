import { useState } from 'react';
import { User } from '../types';
import style from '../styles/item_confirm.module.css';

export default function Checkout({
  name,
  onChangeName,
  email,
  onChangeEmail,
  zipcode,
  onChangeZipcode,
  address,
  onChangeAddress,
  tel,
  onChangeTel,
  time,
  onChangeTime,
  onChangeSta,
}: any) {
  const now = new Date();
  const selectTime = new Date(time);

  const diffTime =
    (selectTime.getTime() - now.getTime()) / (60 * 60 * 1000);

  return (
    <form action="#" method="post" className={style.destinationForm}>
      <h1>お届け先情報</h1>
      <div>
        <label htmlFor="name">お名前：</label>
        {name.length < 1 && <span>名前を入力してください</span>}
      </div>
      <div>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          placeholder="Name"
          onChange={onChangeName}
        />
      </div>
      <div>
        <label htmlFor="email">メールアドレス:</label>
        {email.length < 1 && (
          <span>メールアドレスを入力してください</span>
        )}
        {!email.match(
          /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
        ) &&
          email.length >= 1 && (
            <span>メールアドレスの形式が不正です</span>
          )}
      </div>
      <div>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label htmlFor="zipcode">郵便番号:</label>
        {zipcode.length < 1 && (
          <span>郵便番号を入力してください</span>
        )}
        {!zipcode.match(/^\d{3}-\d{4}$/) && zipcode.length >= 1 && (
          <span>郵便番号はXXX-XXXXの形式で入力してください</span>
        )}
      </div>
      <div>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={zipcode}
          placeholder="Zipcode"
          onChange={onChangeZipcode}
        />
      </div>
      <div>
        <label htmlFor="address">住所：</label>
        {address.length < 1 && <span>住所を入力してください</span>}
      </div>
      <div>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          placeholder="Address"
          onChange={onChangeAddress}
        />
      </div>
      <div>
        <label htmlFor="tel">電話番号:</label>
        {tel.length === 0 && <span>電話番号を入力してください</span>}
        {!tel.match(/^\d{2,4}-\d{3,4}-\d{4}$/) && tel.length >= 1 && (
          <span>電話番号はXXX-XXXX-XXXXの形式で入力してください</span>
        )}
      </div>
      <div>
        <input
          type="tel"
          id="tel"
          name="tel"
          value={tel}
          placeholder="PhoneNumber"
          onChange={onChangeTel}
        />
      </div>
      <div>
        <label>
          <div>
            配達日時：
            {!time && <span>配達日時を入力して下さい</span>}
            {diffTime <= 3 && (
              <span>今から3時間後の日時をご入力ください</span>
            )}
          </div>
          <div>
            <input
              type="datetime-local"
              value={time}
              onChange={onChangeTime}
            />
          </div>
        </label>
      </div>

      <h3>お支払い方法</h3>
      <label>
        <input
          type="radio"
          name="lavel"
          value="1"
          onChange={onChangeSta}
        />
        代金引換
      </label>
      <label>
        <input
          type="radio"
          name="lavel"
          value="2"
          onChange={onChangeSta}
        />
        クレジットカード
      </label>
    </form>
  );
}
