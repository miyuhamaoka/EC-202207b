import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Checkout() {
  const [name, setName] = useState('');
  const onChangeName = (e: any) => setName(e.target.value);

  const [email, setEmail] = useState('');
  const onChangeEmail = (e: any) => setEmail(e.target.value);

  const [zipcode, setZipcode] = useState('');
  const onChangeZipcode = (e: any) => setZipcode(e.target.value);

  const [address, setAddress] = useState('');
  const onChangeAddress = (e: any) => setAddress(e.target.value);

  const [tel, setTel] = useState('');
  const onChangeTel = (e: any) => setTel(e.target.value);

  const [day, setDay] = useState('');
  const onChangeDay = (e: any) => setDay(e.target.value);

  const router = useRouter();

  const zipcodePattern = /^[0-9]{3}-[0-9]{4}$/;
  const telPattern = /^\d{3,4}-\d{3,4}-\d{4}$/;
  const emailPattern = /.+@.+\..+/;

  const onClickCheck = () => {
    fetch('http://localhost:8000/users')
      .then((res) => res.json())
      .then((data) => {
        if (
          !(
            day &&
            name &&
            email.match(
              /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
            ) &&
            zipcode.match(/^\d{3}-\d{4}$/) &&
            address &&
            tel.match(/^(0[5-9]0-[0-9]{4}-[0-9]{4})$/)
          )
        ) {
          alert('全ての項目を正しく入力してください');
          return;
        } else if (!name) {
          alert('名前を入力して下さい');
          return;
        } else if (!email) {
          alert('メールアドレスを入力して下さい');
          return;
        } else if (!emailPattern.test(email)) {
          alert('メールアドレスの形式が不正です');
          return;
        } else if (!zipcode) {
          alert('郵便番号を入力して下さい');
          return;
        } else if (!zipcodePattern.test(zipcode)) {
          alert('郵便番号はXXX-XXXXの形式で入力してください');
          return;
        } else if (!address) {
          alert('住所を入力して下さい');
          return;
        } else if (!tel) {
          alert('電話番号を入力して下さい');
          return;
        } else if (!telPattern.test(tel)) {
          alert('電話番号はXXXX-XXXX-XXXXの形式で入力してください');
          return;
        } else {
          router.push('/');
          return fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              name: name,
              email: email,
              zipcode: zipcode,
              address: address,
              tel: tel,
              day: day,
            }),
          });
        }
      });
  };

  function clearFormAll() {
    setName('');
    setEmail('');
    setAddress('');
    setTel('');
    setZipcode('');
    setDay('');
    return;
  }

  return (
    <div>
      <h3>お届け先情報</h3>
      <form action="post">
        <table>
          <tr>
            <td>
              <label htmlFor="name">お名前：</label>
              {name.length < 1 && (
                <span>名前を入力してください</span>
              )}{' '}
            </td>
            <td>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Name"
                onChange={onChangeName}
              />
            </td>
          </tr>
          <tr>
            <td>
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
            </td>
            <td>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={onChangeEmail}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="zipcode">郵便番号:</label>
              {zipcode.length < 1 && (
                <span>郵便番号を入力してください</span>
              )}
              {!zipcode.match(/^\d{3}-\d{4}$/) &&
                zipcode.length >= 1 && (
                  <span>
                    郵便番号はXXX-XXXXの形式で入力してください
                  </span>
                )}
            </td>
            <td>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={zipcode}
                placeholder="Zipcode"
                onChange={onChangeZipcode}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="address">住所：</label>
              {address.length < 1 && (
                <span>住所を入力してください</span>
              )}
            </td>
            <td>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                placeholder="Address"
                onChange={onChangeAddress}
              />
            </td>
          </tr>

          <tr>
            <td>
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
            </td>
            <td>
              <input
                type="tel"
                id="tel"
                name="tel"
                value={tel}
                placeholder="PhoneNumber"
                onChange={onChangeTel}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="day">配達日時</label>
            </td>
            <td>
              <input
                type="date"
                name="example"
                step="any"
                value={day}
                onChange={onChangeDay}
              />
              <br />
              <label>
                <input type="radio" name="time" value="ten" /> 10時
                <input type="radio" name="time" value="eleven" />
                11時
                <input type="radio" name="time" value="twelve" />
                12時
                <br />
                <input
                  type="radio"
                  name="time"
                  value="thirteen"
                />{' '}
                13時
                <input type="radio" name="time" value="fourteen" />
                14時
                <input type="radio" name="time" value="fifteen" />
                15時
              </label>
              <br />
              <input type="radio" name="time" value="sixteen" /> 16時
              <input type="radio" name="time" value="seventeen" />
              17時
              <input type="radio" name="time" value="eighteen" />
              18時
            </td>
          </tr>
        </table>

        <h3>お支払い方法</h3>
        <label>
          <input type="radio" name="lavel" value="money" />
          代金引換
        </label>
        <label>
          <input type="radio" name="lavel" value="credit" />
          クレジットカード
        </label>
      </form>
    </div>
  );
}

//document.getElementsByName("time");



