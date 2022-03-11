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

          <NavLink href="">Estatisticas</NavLink>
          <NavLink href="nada">Normal Solve</NavLink>
          <NavLink href="nada">BLD Solve</NavLink>
          <NavLink href="nada">Timer</NavLink>

          
          <h2>Outros</h2>

          <NavLink href="nada">Algoritimos</NavLink>
          <NavLink href="nada">Tutoriais</NavLink>
          <NavLink href="nada">Sobre</NavLink>
          <NavLink href="nada">Comandos</NavLink>
        
        </nav>

      </section>
    </aside>
  )
}