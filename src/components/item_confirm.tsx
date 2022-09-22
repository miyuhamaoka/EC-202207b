import Head from 'next/head';
import Image from 'next/image';
import style from '../styles/item_confirm.module.css';
import { Option } from '../types';

const ItemConfirm = (props: any) => {
  const itemtotal = props.item.map((e: any) => e.subtotal);
  const total = itemtotal.reduce((a: number, b: number) => a + b);

  return (
    <>
      <Head>
        <title>注文確認画面</title>
      </Head>
      <div className={style.container}>
        <h1>注文内容確認</h1>
        <table align="center">
          <thead>
            <tr>
              <th>商品</th>
              <th>商品画像</th>
              <th>価格</th>
              <th>数量</th>
              <th>オプション</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            {props.item.map((n: any) => {
              return (
                <tr key={n.id}>
                  <td>{n.name}</td>
                  <td>
                    <Image
                      src={n.image_path}
                      width="100px"
                      height="100px"
                      alt={n.description}
                    />
                  </td>
                  <td>{n.price.toLocaleString()}円</td>
                  <td>{n.quantity}個</td>
                  <td>
                    {n.options.map((option: Option) => {
                      return (
                        <>
                          <p key={option.id}>{option.name}</p>
                          <p>{option.price.toLocaleString()}円</p>
                        </>
                      );
                    })}
                  </td>
                  <td>{n.subtotal}円</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={style.price}>
          <p>消費税：{Math.round(total * 0.08).toLocaleString()}円</p>
          <p>
            ご注文金額合計：
            {Math.round(total * 1.08).toLocaleString()}
            円（税込）
          </p>
        </div>
      </div>
    </>
  );
};

export default ItemConfirm;
