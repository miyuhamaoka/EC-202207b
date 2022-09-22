import { GetStaticPaths, GetStaticProps } from 'next';
import { User } from '../../types';
import React from 'react';
import Link from 'next/link';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:8000/users');
  const users = await res.json();
  return {
    paths: users.map((user: User) => {
      return { params: { id: user.id.toString() } };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: number };
}) => {
  const res = await fetch(`http://localhost:8000/users/${params.id}`);
  const user = await res.json();
  return {
    props: { user },
  };
};

const UserDetail = ({ user }: { user: User }) => {
  return (
    <>
      <h1>登録が完了しました</h1>
      <table>
        <tbody>
          <tr>
            <th>名前</th>
            <td>
              {user.firstName}
              {user.lastName}
            </td>
          </tr>
          <tr>
            <th>メールアドレス</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td>{user.telephone}</td>
          </tr>
          <tr>
            <th>郵便番号</th>
            <td>{user.zipcode}</td>
          </tr>
          <tr>
            <th>住所</th>
            <td>
              {user.prefecture}
              {user.city}
              {user.aza}
              {user.building}
            </td>
          </tr>
          <tr>
            <th>パスワード</th>
            <td>{user.password}</td>
          </tr>
        </tbody>
      </table>
      <button>
        <Link href="/items">商品一覧はこちら</Link>
      </button>
      <button>
        <Link href="/users/login">ログインはこちら</Link>
      </button>
    </>
  );
};

export default UserDetail;
