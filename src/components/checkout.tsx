import { useState } from 'react';
import { User } from '../types';
import TimeAlert from './time_alert';

export default function Checkout({ user }: any) {
  const [name, setName] = useState(user.name);
  const onChangeName = (e: any) => setName(e.target.value);

  const [email, setEmail] = useState(user.email);
  const onChangeEmail = (e: any) => setEmail(e.target.value);

  const [zipcode, setZipcode] = useState(user.zipcode);
  const onChangeZipcode = (e: any) => setZipcode(e.target.value);

  const [address, setAddress] = useState(user.address);
  const onChangeAddress = (e: any) => setAddress(e.target.value);

  const [tel, setTel] = useState(user.telephone);
  const onChangeTel = (e: any) => setTel(e.target.value);

  // const onSubmitData = async (e: any) => {
  //   if (condition) {
      
  //   }
  //   else {
  //     const postParam = {
  //       id: 0,
  //       userId: 0,
  //       totalPrice: props.;
  //       orderDate: Date;
  //       distenationName: string;
  //       distenationEmail: string;
  //       distenationZipcode: string;
  //       distenationAddress: string;
  //       distenationTel: string;
  //       deliveryTime: Date;
  //       paymentMethod: number;
  //       user: User;
  //       orderltemList: Orderitem;
  //     }
  //   }
  // };

  return (
    <div>
      <h3>お届け先情報</h3>
      <form action="#" method="post">
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
          {tel.length === 0 && (
            <span>電話番号を入力してください</span>
          )}
          {!tel.match(/^(0[5-9]0-[0-9]{4}-[0-9]{4})$/) &&
            tel.length >= 1 && (
              <span>
                電話番号はXXX-XXXX-XXXXの形式で入力してください
              </span>
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
          <TimeAlert />
        </div>

        <h3>お支払い方法</h3>
        <label>
          <input type="radio" name="lavel" value="money" />
          代金引換
        </label>
        <label>
          <input type="radio" name="lavel" value="credit" />
          クレジットカード
        </label>
        <div>
          <button type='submit'>注文する</button>
        </div>
      </form>
    </div>
  );
}
