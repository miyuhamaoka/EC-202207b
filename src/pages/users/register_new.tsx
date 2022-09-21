import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { User } from '../../types';
import style from '../../styles/register_new.module.css';
import ItemlistLayout from '../../components/itemlistlayout';

// ユーザ情報を取得
export const getServerSideProps = async () => {
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
  // フォームの入力値を格納
  const initialValues: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    zipcode: '',
    prefecture: '',
    city: '',
    aza: '',
    building: '',
    telephone: '',
    password: '',
    confirmationPassword: '',
    logined: false,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<User>();
  const [isSubmit, setIsSubmit] = useState(false);

  const router = useRouter();

  // 入力値を取得
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // DBに送信
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors = validate(formValues);
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) {
      return isSubmit;
    } else {
      const parameter = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      };

      const res = await fetch(
        'http://localhost:8000/users',
        parameter
      );

      const users = await res.json();
      // console.log(users);
      setIsSubmit(true);
      router.push(`/users/${users.id}`);
      return isSubmit;
    }
  };

  // 登録済みのメールアドレスを取得し、重複してないかチェック
  function emailChecked({ users }: Users) {
    const emailArr = users.map((user: User) => user.email);
    // console.log(emailArr);
    return emailArr.includes(formValues.email);
  }

  // バリデーションチェック
  const validate = (values: User) => {
    const errors = {} as User;

    const emailReg = /.+@.+\..+/;
    const zipcodeReg = /^[0-9]{3}-[0-9]{4}$/;
    const telReg = /^\d{2,4}-\d{3,4}-\d{4}$/;

    if (!values.firstName) {
      errors.firstName = '姓を入力してください';
    }
    if (!values.lastName) {
      errors.lastName = '名を入力してください';
    }
    if (!values.email) {
      errors.email = 'メールアドレスを入力してください';
    } else if (!emailReg.test(values.email)) {
      errors.email = 'メールアドレスの形式が不正です';
    } else if (emailChecked({ users })) {
      errors.email = 'そのメールアドレスはすでに使われています';
    }
    if (!values.password) {
      errors.password = 'パスワードを入力してください';
    } else if (values.password.length < 8) {
      errors.password =
        'パスワードは８文字以上１６文字以内で設定してください';
    } else if (values.password.length > 16) {
      errors.password =
        'パスワードは８文字以上１６文字以内で設定してください';
    }
    if (!values.confirmationPassword) {
      errors.confirmationPassword =
        '確認用パスワードを入力してください';
    } else if (values.password !== values.confirmationPassword) {
      errors.confirmationPassword =
        'パスワードと確認用パスワードが不一致です';
    }
    if (!values.zipcode) {
      errors.zipcode = '郵便番号を入力してください';
    } else if (!zipcodeReg.test(values.zipcode)) {
      errors.zipcode = '郵便番号はXXX-XXXXの形式で入力してください';
    }
    if (!values.prefecture) {
      errors.prefecture = '都道府県を入力してください';
    }
    if (!values.city) {
      errors.city = '市区町村を入力してください';
    }
    if (!values.aza) {
      errors.aza = '字丁目を入力してください';
    }
    if (!values.telephone) {
      errors.telephone = '電話番号を入力してください';
    } else if (!telReg.test(values.telephone)) {
      errors.telephone =
        '電話番号はXXXX-XXXX-XXXXの形式で入力してください';
    }
    return errors;
  };

  // フォームクリア
  const clearForm = () => {
    setFormValues(initialValues);
    return;
  };

  return (
    <section>
      <ItemlistLayout></ItemlistLayout>
      <form onSubmit={handleSubmit} className={style.registerForm}>
        <fieldset>
          <legend>ユーザー登録</legend>
          <div className={style.uiForm}>
            <label htmlFor="firstName" className={style.label}>お名前</label>
            <div className={style.nameForm}>
              <div>
                <span>(姓)</span>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="姓"
                  value={formValues.firstName}
                  onChange={handleChange}
                />
                <p>{formErrors?.firstName}</p>
              </div>
              <div>
                <span>(名)</span>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="名"
                  value={formValues.lastName}
                  onChange={handleChange}
                />
                <p>{formErrors?.lastName}</p>
              </div>
            </div>
          </div>
          <div className={style.uiForm}>
            <div>
            <label htmlFor="email" className={style.label}>メールアドレス</label>
            </div>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="メールアドレス"
              value={formValues.email}
              onChange={handleChange}
            />
            <p>{formErrors?.email}</p>
          </div>
          <div className={style.uiForm}>
            <div>
            <label htmlFor="zipcode" className={style.label}>郵便番号</label>
            </div>
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              placeholder="郵便番号"
              value={formValues.zipcode}
              onChange={handleChange}
            />
            <p>{formErrors?.zipcode}</p>
          </div>
          <div className={style.uiForm}>
            <div>
            <label htmlFor="prefecture" className={style.label}>住所1(都道府県)</label>
            </div>
            <input
              type="text"
              name="prefecture"
              id="prefecture"
              placeholder="都道府県"
              value={formValues.prefecture}
              onChange={handleChange}
            />
            <p>{formErrors?.prefecture}</p>
            <div className={style.uiForm}>
            <label htmlFor="city" className={style.label}>住所2(市区町村)</label>
            </div>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="市区町村"
              value={formValues.city}
              onChange={handleChange}
            />
            <p>{formErrors?.city}</p>
            <div className={style.uiForm}>
            <label htmlFor="aza" className={style.label}>住所3(字丁目)</label>
            </div>
            <input
              type="text"
              name="aza"
              id="aza"
              placeholder="字丁目"
              value={formValues.aza}
              onChange={handleChange}
            />
            <p>{formErrors?.aza}</p>
            <div className={style.uiForm}>
            <label htmlFor="building" className={style.label}>住所4(建物名)</label>
            </div>
            <input
              type="text"
              name="building"
              id="building"
              placeholder="建物名"
              value={formValues.building}
              onChange={handleChange}
            />
            <p>{formErrors?.building}</p>
          </div>
          <div className={style.uiForm}>
            <div>
            <label htmlFor="tel" className={style.label}>電話番号</label>
            </div>
            <input
              type="tel"
              name="telephone"
              id="tel"
              placeholder="電話番号"
              value={formValues.telephone}
              onChange={handleChange}
            />
            <p>{formErrors?.telephone}</p>
          </div>
          <div className={style.uiForm}>
            <div>
            <label htmlFor="pass" className={style.label}>パスワード</label>
            </div>
            <input
              type="pass"
              name="password"
              id="pass"
              placeholder="パスワード"
              value={formValues.password}
              onChange={handleChange}
            />
            <p>{formErrors?.password}</p>
          </div>
          <div className={style.uiForm}>
            <div>
            <label htmlFor="confirmPass" className={style.label}>確認用パスワード</label>
            </div>
            <input
              type="pass"
              name="confirmationPassword"
              id="confirmPass"
              placeholder="確認用パスワード"
              value={formValues.confirmationPassword}
              onChange={handleChange}
            />
            <p>{formErrors?.confirmationPassword}</p>
          </div>
          <div>
            <button>登録</button>
            <button onClick={clearForm}>クリア</button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default Register;
