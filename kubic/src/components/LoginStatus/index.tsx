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
          <Img className={styles.img} src={session.user.image} alt="Foto do seu pérfil de usuário"/>
        </button>
      ): (
        <button onClick={() => signIn()}>
          <div>
            <h3>Not Signed</h3>
            <p>Click to Sign in</p>
          </div>
          <Img className={styles.img} src="/images/guest-image.png" alt="Foto de perfil do usuário não logado"/>
        </button>
      )}
    </div>
  )
}
