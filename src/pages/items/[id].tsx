import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/itemlistlayout';
import style from '../../styles/item_detail.module.css';
import { Option } from '../../types';
import styles from '../../components/items.module.css';
import { exit } from 'process';

export async function getStaticPaths() {
  const res = await fetch('http://localhost:8000/items');
  const number = await res.json();
  const paths = number.map((num: any) => {
    return { params: { id: num.id.toString() } };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(`http://localhost:8000/items/${params.id}`);
  const detail = await res.json();
  const response = await fetch(`http://localhost:8000/options/`);
  const options = (await response.json()) as Option[];
  if (!detail || !detail.id) {
    return { redirect: {
      destination: '/items',
      permanent: true,
     } };
  } else {
    return {
      props: { detail, options },
    };
  }
}

const ItemData = ({
  detail,
  options,
}: {
  detail: any;
  options: Option[];
}) => {
  const [checkedOp, setCheckedOp] = useState<Option[]>([]);
  const [num, setNum] = useState(1);
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div>
      <Head><title>不明</title></Head>
    <p>お探しのページは存在しません</p>
    </div>
    )
  } else {
 
  const cookie = () => {
    if (typeof document !== 'undefined') {
      if (document.cookie) {
        const cookies = document.cookie;
        console.log('id', cookies);
        const num = cookies.substring(cookies.indexOf('id='));
        console.log('num', num);
        const cookieArray = num.split('; ');
        console.log('array', cookieArray);
        return Number(cookieArray[0].slice(3));
      }
    }
  };
  let optionPrice = checkedOp.map((option: Option) => option.price);
  let optionTotal = optionPrice.reduce(
    (a: number, b: number) => a + b,
    0
  );
  let total = num * detail.price + optionTotal;


  const direct = () => {
    if (cookie() !== undefined) {
      router.push(`/items/cart?userId=${cookie()}`);
    } else {
      router.push(`/items/logoutCart`);
    }
  };

  const Submit = async () => {
    if (document.cookie !== '') {
      const res = await fetch(
        `http://localhost:8000/cartItems?userId=${cookie()}`
      );
      const data = await res.json();

      console.log('data', data);

      if (data[0]) {
        return fetch(
          `http://localhost:8000/cartitems/${data[0].id}`,
          {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              items: [
                ...data[0].items,
                {
                  id: detail.id,
                  type: detail.type,
                  name: detail.name,
                  description: detail.description,
                  price: detail.price,
                  image_path: detail.image_path,
                  deleted: detail.deleted,
                  priceM: detail.priceM,
                  priceL: detail.priceL,
                  quantity: num,
                  subtotal: num * detail.price + optionTotal,
                  options: checkedOp,
                },
              ],
            }),
          }
        );
      } else if (!data[0]) {
        return fetch(`http://localhost:8000/cartitems`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            userId: cookie(),
            items: [
              {
                id: detail.id,
                type: detail.type,
                name: detail.name,
                description: detail.description,
                price: detail.price,
                image_path: detail.image_path,
                deleted: detail.deleted,
                priceM: detail.priceM,
                priceL: detail.priceL,
                quantity: num,
                subtotal: num * detail.price + optionTotal,
                options: checkedOp,
              },
            ],
          }),
        });
      }
    } else {
      const logoutCartItemsArray = [
        {
          id: detail.id,
          type: detail.type,
          name: detail.name,
          description: detail.description,
          price: detail.price,
          image_path: detail.image_path,
          deleted: detail.deleted,
          priceM: detail.priceM,
          priceL: detail.priceL,
          quantity: num,
          subtotal: num * detail.price + optionTotal,
          options: checkedOp,
        },
      ];
      const logoutCartItems = {
        id: detail.id,
        type: detail.type,
        name: detail.name,
        description: detail.description,
        price: detail.price,
        image_path: detail.image_path,
        deleted: detail.deleted,
        priceM: detail.priceM,
        priceL: detail.priceL,
        quantity: num,
        subtotal: num * detail.price + optionTotal,
        options: checkedOp,
      };

      if (!localStorage.getItem('logoutCartItems')) {
        localStorage.setItem(
          'logoutCartItems',
          JSON.stringify(logoutCartItemsArray)
        );
      } else {
        const addCart = JSON.parse(
          localStorage.getItem('logoutCartItems')!
        );
        addCart.push(logoutCartItems);
        console.log('addCart', addCart);
        localStorage.removeItem('logoutCartItems');
        localStorage.setItem(
          'logoutCartItems',
          JSON.stringify(addCart)
        );
      }
    }
  };

  const handleDone: any = (e: any, op: Option) => {
    console.log('e.target.checked', e.target.checked);
    if (e.target.checked === false) {
      // チェックが外れたらcheckedOpから取り除く
      setCheckedOp(
        checkedOp.filter((option: Option) => op.id !== option.id)
      );
    } else {
      // チェックがついたらcheckedOpに加える
      setCheckedOp([...checkedOp, op]);
    }
  };

  return (
    <>
      <Head>
        <title>商品詳細</title>
      </Head>
      <Layout></Layout>
      <div className={styles.body}>
        <div className={styles.left}>
          <h1 className={styles.h1}>{detail.name}</h1>
          <p className={styles.description}>{detail.description}</p>
          <Image
            src={detail.image_path}
            width="300px"
            height="300px"
            alt={detail.description}
          />
          <p className={styles.select}>
            数量：
            <select
              className={styles.select}
              name="quantity"
              onChange={(e: any) => setNum(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>{' '}
            個
          </p>
          <p className={styles.price}>
            金額：<span>{detail.price.toLocaleString()}</span>円(1個)
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.op}>
            <h3 className={styles.h3}>オプション一覧</h3>
            <p className={styles.p}>
              ※除菌ウェットシート、保冷剤は<span>有料（¥100）</span>
              です。除菌ウェットシート、保冷剤以外は無料です。
            </p>
            <div>
              {options.map((op: any) => {
                return (
                  <div className={styles.checkbox} key={op.id}>
                    <input
                      type="checkbox"
                      id="checkbox"
                      value={op.id}
                      onChange={(e) => handleDone(e, op)}
                      // checked={}
                    />
                    <span className={styles.tac}>{op.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <form className={styles.form} method="post">
            <p className={styles.total}>
              商品の合計金額：<span>{total.toLocaleString()}</span>円
            </p>
            <button
              type="button"
              className={styles.btn}
              onMouseDown={() => Submit()}
              onClick={() => direct()}
            >
              カートに入れる
            </button>
          </form>
        </div>
      </div>
    </>
  );
            }
};

export default ItemData;
