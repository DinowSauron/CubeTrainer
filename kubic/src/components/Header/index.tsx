import Img from "../Img/Img";
import { LoginStatus } from "../LoginStatus";
import styles from "./header.module.scss";
import { SearchBar } from "./SearchBar"

type HeaderProps = {
  
}

export function Header(props: HeaderProps) {

  return (
    <header className={styles.main}>

      <div className={styles.LeftContent}>
        <SearchBar/>

      </div>

      <div className={styles.RightContent}>

        <span/>
        <LoginStatus />
      </div>
    </header>
  )
}