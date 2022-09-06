import Link from 'next/link';

export default function button() {
  return (
    <>
      <div>
        <h1>決済が完了しました！</h1>
        <br />
        <p>この度はご注文ありがとうございます。</p>
        <p>
          お支払い先は、お送りしたメールに記載してありますのでご確認ください。
        </p>
        <p>メールが届かない場合は「注文履歴」からご確認ください。</p>
      </div>
      <div>
        <button type="submit">
          <Link href="/items">
            <a>トップ画面を表示する</a>
          </Link>
        </button>
      </div>
    </>
  );
}
