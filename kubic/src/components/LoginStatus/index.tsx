import Img from "../Img/Img";
import styles from "./login-status.module.scss";

type LoginStatusProps = {
  
}

export function LoginStatus(props: LoginStatusProps) {

  return (
    <div className={styles.profile}>
      <div>
        <h3>Dinow Sauron</h3>
        <p>luizclaudiocardoso@yahoo.com</p>
      </div>
      <Img className={styles.img} src="https://github.com/dinowsauron.png" alt="profile picture"/>
      
    </div>
  )
}