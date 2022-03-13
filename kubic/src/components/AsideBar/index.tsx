import styles from "./aside.module.scss";
import { NavLink } from "./NavLink";

type AsideProps = {

}

export function AsideBar(props: AsideProps) {

  return (
    <aside className={styles.main}>

      <h1>
        KUBIC<span>.</span>
      </h1>
      <section className={styles.sections}>
        <nav>
          
          <h2>Geral</h2>

          <NavLink href="/" exactHref reload> Statistics </NavLink>
          <NavLink href="/normalsolve" exactHref> Normal Solve </NavLink>
          <NavLink href="/bldsolve" exactHref> BLD Solve </NavLink>
          <NavLink href="/nada" exactHref> Timer </NavLink>

          
          <h2>Outros</h2>

          <NavLink href="/nada" exactHref> Algoritimos </NavLink>
          <NavLink href="/nada" exactHref> Tutoriais </NavLink>
          <NavLink href="/nada" exactHref> Sobre </NavLink>
          <NavLink href="/nada" exactHref> Comandos </NavLink>
        
        </nav>

      </section>
    </aside>
  )
}