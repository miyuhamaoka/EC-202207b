import Link from 'next/link';
import useSWR from 'swr';
import { Item } from '../types';

//アップロード用のために記述しなければいけない『決まりごと』
export const fetcher: (args: string) => Promise<any> = (...args) =>
  fetch(...args).then((res) => res.json());

export default function Items() {
  const { data, error } = useSWR('/api/items', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {data.map((item: Item) => {
        const {imageUrl, id, name, price } = item;
        return (
          <div key={id}>
            <img src= {imageUrl}></img>
            <Link href={`/items/`}>
              <a>
                <h1>{name}</h1>
              </a>
            </Link>
            <p>価格: {price}円</p>
          </div>
        );
      })}
    </div>
  );
}
