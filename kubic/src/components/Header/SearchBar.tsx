import Img from "../Img/Img";
import styles from "./header.module.scss";


export function SearchBar() {

  return (
    <div className={styles.searchArea}>
      <input type="text" />
      <button aria-label="Search">
        <Img className={styles.img} src="./icons/search.svg" alt="search Icon"/>
      </button>
    </div>
  )
}