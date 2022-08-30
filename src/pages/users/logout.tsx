// https://swr.vercel.app/ja/docs/mutation
// ↑から一旦持ってきた。
// 次の例では、ユーザーが "Logout" ボタンをクリックしたときに、ログイン情報 （ たとえば <Profile/> の中身 ）を自動的に取得する方法を示します。

import useSWR, { useSWRConfig } from 'swr'

function App () {
  const { mutate } = useSWRConfig()

  return (
    <div>
      <button onClick={() => {
        // クッキーを期限切れとして設定します
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

        // このキーを使用してすべての SWR に再検証するように指示します
        mutate('/api/user')
      }}>
        Logout
      </button>
    </div>
  )
}