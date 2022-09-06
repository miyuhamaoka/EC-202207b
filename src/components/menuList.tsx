import Link from 'next/link';	
	import { useState } from 'react';
	import useSWR from 'swr';
	import { Item } from '../types';
	import styles from '../components/items.module.css';
	import Image from 'next/image'
import { resourceLimits } from 'worker_threads';
//import useSWRInfinite from "swr/infinite";

	
	export const fetcher: (args: string) => Promise<any> = (...args) =>
	fetch(...args).then((res) => res.json());
	
	export default function Items() {
	const { data, error } = useSWR('/api/items', fetcher);
	
	const [nameText, setNameText] = useState('');
	const onChangeNameText = (event: any) =>
	setNameText(event.target.value);
	const [searchData, setSearchData] = useState([]);
	//const [orderData, setOrderData] = useState();
	//const [notSeach, setNotSearch] = useState('none');


	if (error) return <div>Failed to load</div>;
	if (!data) return <div>Loading...</div>;


	
const formClear = () =>{
	setNameText('');
	setSearchData([]);
};

	const onClickSearch = ()=>  {
	setSearchData(
    data.filter((e: any) => {
	return e.name === nameText;
	})
	);
	console.log(searchData);
	//console.log(notSeach)
	};

	const cheapData = data.sort(function (
		{ price: a }: any,
		{ price: b }: any
	  ) {
		return a - b;
	  });
       
	
	return (
	<div>
	<div className={styles.searchWrapper}>
	<div className="sercheform">
	<form
	method="get"
	action="#"
	className={styles.searchForm}
	>
	<label htmlFor="name"></label>
	<input
	type="text"
	id="name"
	name="name"
	value={nameText}
	placeholder={'商品名を入れてください'}
	onChange={onChangeNameText}
	className={styles.search_container}
	></input>
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
	type= "reset"
	value="クリア"
	className={styles.clearBtn}
	onClick={() => formClear()}>
		クリア
	</button>
 {/*<p style={{display: notSeach}}>
	該当の商品はありません。
</p>*/}
    </form>
	</div>
	</div>
	<div className={styles.itemWrapper}>
	{nameText == ''
	? data.map((item: Item) => {
	const { id, image_path, name, price } = item;
	return (
	<div key={id} className={styles.card}>
	<div className={styles.item}>
	<Image src={image_path} alt={name} width={210} height={210}/>
	<Link href={`http://localhost:3000/items/${id}`}>
	<a>
	<p className={styles.text}>{name}</p>
	</a>
	</Link>
	<p>価格: {price}円</p>
	</div>
	</div>
	);
	})
	: searchData.map((item: Item) => {
	const { id, image_path, name, price } = item;
	return (
	<div key={id}>
	<table className={styles.item}>
	<tr>
	<th>
	<Image src={image_path} alt={name} width={200} height={100}/>
	</th>
	</tr>
	<tr>
	<th>
	<Link href={`http://localhost:3000/items/${id}`}>
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
	</div>
	</div>
	);
	}

