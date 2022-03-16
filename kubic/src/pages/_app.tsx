import { AsideBar } from '../components/AsideBar'
import { Header } from '../components/Header'
import styles from "../styles/app.module.scss"
import '../styles/globals.scss'

import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <div className={styles.main}>
      <SessionProvider session={session}>
      <AsideBar/>
      
      <div className={styles.container}>
        <Header/>

        <Component {...pageProps} />
      </div>
      </SessionProvider>
    </div>
  )
}

export default MyApp
