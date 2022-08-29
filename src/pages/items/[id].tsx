import Head from 'next/head';
import Image from 'next/image';

export async function getStaticPaths() {
  const res = await fetch('http://localhost:8000/items');
  const number = await res.json();
  const paths = number.map((num: any) => {
    return { params: { id: num.id.toString() } };
  });
  console.log('paths', paths);
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(`http://localhost:8000/items/${params.id}`);
  const detail = await res.json();
  console.log('detail', detail);
  if (!detail.id) {
    return { notFound: true };
  } else {
    return {
      props: { detail },
      revalidate: 1,
    };
  }
}

const ItemData = ({ detail }: any) => {
  let remove = 0;
  const radioDeselect = (already: any, numeric: any) => {
    if (remove == numeric) {
      already = false;
      remove = 0;
    } else {
      remove = numeric;
    }
  };
  return (
    <>
      <Head>
        <title>商品詳細</title>
      </Head>
      <div>
        <p>{detail.name}</p>
        <p>{detail.description}</p>
        <Image src={detail.image_path} width='300px' height='300px' alt={detail.description} />
      </div>
      <form>
        <input
          type="radio"
          id="M"
          name="Msize"
          value="1"
          onClick={() => radioDeselect(this, 1)}
          checked
        />
        <label htmlFor="Msize">M {detail.priceM}円</label>
        <input
          type="radio"
          id="L"
          name="Lsize"
          value="2"
          onClick={() => radioDeselect(this, 2)}
        />
        <label htmlFor="Lsize">L {detail.priceL}円</label>
        <br />
        <p>
          数量
          <select name="quantity">
            <option value="1" selected>
              1
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </p>
      </form>
    </>
  );
};

export default ItemData;
