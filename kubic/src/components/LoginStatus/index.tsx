import Img from "../Img/Img";
import styles from "./login-status.module.scss";

import { useSession, signIn, signOut } from "next-auth/react"

type LoginStatusProps = {
  
}


export function LoginStatus(props: LoginStatusProps) {

  const logged = false;
  const {data: session} = useSession()

  return (
    <div className={styles.profile}>
      {session ? (
        <button onClick={() => signOut()}>
          <div>
            <h3>{session.user.name}</h3>
            <p>{session.user.email}</p>
          </div>
          <Img className={styles.img} src={session.user.image} alt="profile picture"/>
        </button>
      ): (
        <button onClick={() => signIn()}>
          <div>
            <h3>Not Signed</h3>
            <p>Click to Sign in</p>
          </div>
          <Img className={styles.img} src="https://github.com/dinowsauron.png" alt="profile picture"/>
        </button>
      )}
    </div>
  )
}