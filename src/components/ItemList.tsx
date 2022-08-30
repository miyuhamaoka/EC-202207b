import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import { Item } from '../types';
import  styles  from '../components/items.module.css' 

export const fetcher: (args: string) => Promise<any> = (...args) =>
  fetch(...args).then((res) => res.json());

export default function Items() {
  const { data, error } = useSWR('/api/items', fetcher);

  const [nameText, setNameText] = useState('');
  const onChangeNameText = (event: any) =>
    setNameText(event. target. value);
  const [searchData, setSearchData] = useState([]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const onClickSearch = () => {
    setSearchData(
      data.filter((e: any) => {
        return e.name === nameText;
      })
    );
    console.log(searchData);
  };

  return (
    <div>
      <div className={styles.searchWrapper}>
        <p className={styles.seachTitle}>商品を検索！</p>
        <div className="sercheform">
          <form
            method="post"
            action="#"
            className={styles.searchForm}
          >
            <label htmlFor="name">商品名</label>
            <input
              type="text"
              id="name"
              name="name"
              value={nameText}
              placeholder={'search'}
              onChange={onChangeNameText}
              className={styles.searchNameInput}
            ></input>
            <br />
            <button
              type="button"
              value="検索"
              className={styles.searchBtn}
              onClick={() => {
                onClickSearch();
              }}
            >
              検索
            </button>
            <button
              type="reset"
              value="クリア"
              className={styles.caselBtn}
            >
              クリア
            </button>
          </form>
        </div>
      </div>
      <div className={styles.itemWrapper}>
        {}
        {nameText == ''
          ? data.map((item: Item) => {
              const { id, imageUrl, name, price } = item;
              return (
                <div key={id}>
                  <table className={styles.item}>
                    <tr>
                      <th>
                        <img src={imageUrl} width={300} />
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <Link href={`/api/items`}>
                          <a>
                            <p>{name}</p>
                          </a>
                        </Link>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <p>価格: {price}円</p>
                      </th>
                    </tr>
                  </table>
                </div>
              );
            })
          : searchData.map((item: Item) => {
              const { id, imageUrl, name, price } = item;
              return (
                <div key={id}>
                  <table className={styles.item}>
                    <tr>
                      <th>
                        <img src={imageUrl} width={300} />
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <Link href={`/api/items`}>
                          <a>
                            <p>{name}</p>
                          </a>
                        </Link>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <p>価格: {price}円</p>
                      </th>
                    </tr>
                  </table>
                </div>
              );
            })}
        ;
      </div>
    </div>
  );
}
