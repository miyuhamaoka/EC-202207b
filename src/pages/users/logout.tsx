import Link from "next/link";

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
      <Link href="/users/login" onClick={onclickHundle}>
        <a>ログアウト</a>
      </Link>
    </>
  );
};

export default Logout;
