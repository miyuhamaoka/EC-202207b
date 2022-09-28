import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import { Item } from '../types';
import styles from '../components/items.module.css';
import Image from 'next/image';
import { isBuffer } from 'util';

//import { resourceLimits } from 'worker_threads';
//import useSWRInfinite from "swr/infinite";

export const fetcher: (args: string) => Promise<any> = (...args) =>
  fetch(...args).then((res) => res.json());

export default function Items() {
  const { data, error } = useSWR('/api/items', fetcher);

  const [nameText, setNameText] = useState('');
  // const onChangeNameText = (event: any) =>
  //   setNameText(event.target.value);
  const [searchData, setSearchData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [expensive, setExpensive] = useState([]);
  const [randomData, setRandomData] = useState([]);

  //ページング機能の実装
  const perPage = 6;
  const [pageIndex, setPageIndex] = useState(1);
  const [currentPage, setCurrentPage] = useState('');

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  //ページ数の表示
  const pageNumArray = [];
  for (let i = 1; i <= data.length / perPage; i++) {
    pageNumArray.push(i);
  }

  const randoms = () => {
    setRandomData([]);
  };

  const expensiveData = () => {
    setExpensive([]);
    data.sort(function ({ price: a }: any, { price: b }: any) {
      return b - a;
    });
    searchData.sort(function ({ price: a }: any, { price: b }: any) {
      return b - a;
    });
    // console.log(expensive);
  };

  const formClear = () => {
    setNameText('');
    setSearchData([]);
  };

  const onClickSearch = () => {
    setSearchData(
      data.filter((e: any) => {
        return e.name.indexOf(nameText) >= 0;
      })
    );
    // console.log(searchData);
  };

  const cheapData = () => {
    setOrderData([]);
    data.sort(function ({ price: a }: any, { price: b }: any) {
      return a - b;
    });
    searchData.sort(function ({ price: a }: any, { price: b }: any) {
      return a - b;
    });
    // console.log(orderData);
  };

  // リアルタイム検索機能追加
  const search = (value: string) => {
    if (value !== '') {
      const filteredList = data.filter(
        (item: Item) =>
          item.name
            .trim()
            .toLowerCase()
            .indexOf(value.trim().toLowerCase()) !== -1
      );
      setSearchData(filteredList);
      return;
    } else {
      setSearchData([]);
      return;
    }
  };

  const handleChange = (e: any) => {
    setNameText(e.target.value);
    search(e.target.value);
  };

  return (
    <div>
      <div className={styles.searchWrapper}>
        <div className="sercheform">
          <form method="get" action="#" className={styles.searchForm}>
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              name="name"
              value={nameText}
              placeholder={'商品名を入れてください'}
              onChange={handleChange}
              className={styles.search_container}
            ></input>
            {/* <button
              type="button"
              value="検索"
              className={styles.searchBtn}
              onClick={() => {
                onClickSearch();
              }}
            >
              検索
            </button> */}

            <button
              type="button"
              value="クリア"
              className={styles.clearBtn}
              onClick={() => formClear()}
            >
              クリア
            </button>
            <label>
              <input
                type="radio"
                value="安価"
                name="Btn"
                className={styles.cheapBtn}
                onClick={() => cheapData()}
              />
              価格が安い順番
              <input
                type="radio"
                value="高価"
                name="Btn"
                className={styles.expensiveBtn}
                onClick={() => expensiveData()}
              />
              価格が高い順番
            </label>
          </form>
        </div>
      </div>
      {/* 画面に表示させるデータの切り取り */}
      <div className={styles.itemWrapper}>
        {nameText === '' ? (
          data
            .slice(pageIndex * perPage - perPage, pageIndex * perPage)
            .map((item: Item) => {
              const { id, image_path, name, price } = item;
              return (
                <div key={id} className={styles.card}>
                  <Link href={`http://localhost:3000/items/${id}`}>
                    <a>
                      <div className={styles.item}>
                        <Image
                          src={image_path}
                          alt={name}
                          width={210}
                          height={210}
                        />
                        <p className={styles.text}>{name}</p>
                        <p>価格: {price}円</p>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })
        ) : searchData.length == 0 ? (
          <p>該当する商品がありません</p>
        ) : (
          searchData.map((item: Item) => {
            const { id, image_path, name, price } = item;
            return (
              <div key={id} className={styles.card}>
                <Link href={`http://localhost:3000/items/${id}`}>
                  <a>
                    <div className={styles.item}>
                      <Image
                        src={image_path}
                        alt={name}
                        width={210}
                        height={210}
                      />
                      <p className={styles.text}>{name}</p>
                      <p>価格: {price}円</p>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })
        )}
      </div>
      {/* ページ選択 */}
      <div>
        {pageNumArray.map((e) => {
          if (e === pageIndex) {
            return (
              <button
                key={e}
                className={styles.thisPage}
                onClick={() => {
                  setPageIndex(e);
                }}
              >
                &nbsp;{e}&nbsp;
              </button>
            );
          } else {
            return (
              <button
                key={e}
                className={styles.anotherPage}
                onClick={() => {
                  setPageIndex(e);
                }}
              >
                &nbsp;{e}&nbsp;
              </button>
            );
          }
        })}
      </div>
      <p>
        {pageIndex > 1 ? (
          <button
            onClick={() => setPageIndex(pageIndex - 1)}
            className={styles.searchBtn}
          >
            前のページ
          </button>
        ) : (
          ''
        )}
        {pageIndex !== data.length / perPage ? (
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            className={styles.searchBtn}
          >
            次のページ
          </button>
        ) : (
          ''
        )}
      </p>
    </div>
  );
}
