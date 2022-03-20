import { AsideBar } from '../components/AsideBar'
import { Header } from '../components/Header'
import styles from "../styles/app.module.scss"
import '../styles/globals.scss'

import { SessionProvider } from "next-auth/react"
import { ScoreContextProvider } from '../contexts/UserScoresContext'

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <div className={styles.main}>
      <SessionProvider session={session}>
      <AsideBar/>
      
      <ScoreContextProvider>
      <div className={styles.container}>
        <Header/>

        <Component {...pageProps} />
      </div>
      </ScoreContextProvider>
      </SessionProvider>
    </div>
  )
}

export default MyApp
