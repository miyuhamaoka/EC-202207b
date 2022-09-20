import Head from 'next/head'
import History from '../../components/history'
import Header from '../../components/layout'

const OrderHistory = () => {
  return (
    <>
    <Head><title>注文履歴</title></Head>
    <Header />
    <h1>注文履歴</h1>
    <History />
    </>
  )
}

export default OrderHistory;
