import Head from "next/head";
import Image from "next/image";

const ItemConfirm = (props:any) => {

  const itemtotal = props.item.map((e: any) => e.subtotal);
  const total = itemtotal.reduce((a: number, b: number) => a + b);

  return (
  <>
  <Head>
        <title>注文確認画面</title>
      </Head>
      <h1>注文内容確認</h1>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>商品</th>
            <th>価格</th>
            <th>数量</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          {props.item.map((n: any) => {
            const subtotal = n.price * n.quantity;
            return (
              <tr key={n.id}>
                <td>{n.name}</td>
                <td>
                  <Image
                    src={n.image_path}
                    width="30px"
                    height="30px"
                    alt={n.description}
                  />
                </td>
                <td>{n.price}円</td>
                <td>{n.quantity}個</td>
                <td>{subtotal}円</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
      <p>消費税：{Math.round(total * 0.08).toLocaleString()}円</p>
      <p>
        ご注文金額合計：{Math.round(total * 1.08).toLocaleString()}
        円（税込）
      </p>
      </div>
      </>
  )
}

export default ItemConfirm;
