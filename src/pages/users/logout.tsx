import Link from "next/link";
// https://swr.vercel.app/ja/docs/mutation
// ↑から一旦持ってきた。使えるかわかんない
// 次の例では、ユーザーが "Logout" ボタンをクリックしたときに、ログイン情報 （ たとえば <Profile/> の中身 ）を自動的に取得する方法を示します。

export const Logout = () => {
  const onclickHundle = () => {

    if(document.cookie!==''){
    var date = new Date('1970-12-31T23:59:59Z');
    document.cookie = `id=;path=/;expires=${date.toUTCString()};`;
    document.cookie = `name=;path=/;expires=${date.toUTCString()};`;
   
      // document.cookie = 'name=; max-age=0';
      // document.cookie = 'id=; max-age=0';
      alert('ログアウトしました');
    }else{
      alert('ログインをしてください')
    }
  };
  return (
    <>
    <Link  href="/users/login">
      <a onClick={onclickHundle}>ログアウト
      </a>
    </Link>
    </>
  );
};

export default Logout;
