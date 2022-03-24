import Img from "../Img/Img";
import styles from "./login-status.module.scss";

import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import { useState } from "react";

type LoginStatusProps = {
  
}
type user = {
  email?: string;
  name?: string;
  image?: string;
}


export function LoginStatus(props: LoginStatusProps) {

  const session = useSession()
  const [user, setUser] = useState({} as user);

  useEffect(() => {
    if(session.status == "authenticated"){
      setUser(session.data.user)
    }
  }, [session])

  return (
    <div className={styles.profile}>
      {session.status == "authenticated" ? (
        <button onClick={() => signOut()}>
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          {user.image && (
            <Img className={styles.img} src={user.image} alt="Foto do seu perfil de usuário"/>
          )}
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
