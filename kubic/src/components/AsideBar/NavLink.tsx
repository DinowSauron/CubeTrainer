import { ReactText } from "react";
import { useRouter } from "next/router";
import styles from "./navlink.module.scss";

type NavLinkProps = {
  children: ReactText;
  href: string;
  shuldMatchExactHref?: boolean;
}

export function NavLink(
  {children, href, shuldMatchExactHref}: NavLinkProps) {

  const { asPath } = useRouter();

  const matchHref = shuldMatchExactHref ? 
    asPath === href :
    asPath.includes(href.toString())

  
  return (
    <div className={styles.NavLink}>
      <p className={matchHref && styles.active}>{children}</p>
    </div>
  )
}