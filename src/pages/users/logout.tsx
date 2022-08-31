// https://swr.vercel.app/ja/docs/mutation
// ↑から一旦持ってきた。使えるかわかんない
// 次の例では、ユーザーが "Logout" ボタンをクリックしたときに、ログイン情報 （ たとえば <Profile/> の中身 ）を自動的に取得する方法を示します。

import useSWR, { useSWRConfig } from 'swr'

export default function Logout () {
  const { mutate } = useSWRConfig()
  return (
    <div>
      {/* ここに取得するコンポーネント入れたい */}
      <button onClick={() => {
        // クッキーを期限切れとして設定
        const date =new Date();
        document.cookie = `id=; expires=Thu, expires=${date.toUTCString} path=/;`
        // このキーを使用してすべての SWR に再検証
        mutate('http://localhost:8000/users');
      }}>
        Logout
      </button>
    </div>
  )
}