import { AsideBar } from '../components/AsideBar'
import { Header } from '../components/Header'
import styles from "../styles/app.module.scss"
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.main}>
      
      <AsideBar/>
      
      <div className={styles.container}>
        <Header/>

        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
