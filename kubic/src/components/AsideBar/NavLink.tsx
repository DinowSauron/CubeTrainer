import { ReactText } from "react";
import { useRouter } from "next/router";
import styles from "./navlink.module.scss";
import Link from "next/link";

type NavLinkProps = {
  children: ReactText;
  href: string;
  exactHref?: boolean;
  reload?: boolean; //if page have apexchart
}

export function NavLink(
  {children, href, exactHref, reload}: NavLinkProps) {

  const { asPath } = useRouter();

  const matchHref = exactHref ? 
    asPath === href :
    asPath.includes(href.toString())

  
  return (
    <div className={styles.NavLink + " " + (matchHref ? styles.active : "")}>
      {reload ? (
        <a href={href}>{children}</a>
      ):(
        <Link href={href} >{children}</Link>
      )}
    </div>
  )
}