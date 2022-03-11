import { useEffect } from "react"
import { useState } from "react"
import { AsideBar } from "../components/AsideBar"
import { Graphs } from "../components/Graphs"
import { Header } from "../components/Header"
import { SetDisplayVars } from "../lib/GlobalFunctions"
import styles  from "../styles/page-styles/index.module.scss"



export default function Index() {


  
  useEffect(() => {
    SetDisplayVars();
    window.addEventListener('resize', SetDisplayVars);
  }, [])
  
  const solveTimes = [25,32,19,29,24,18,19,32,26,24]

  return (
    <div className={styles.main}>

      <AsideBar/>

      <div className={styles.container}>
        <Header/>
        <section>
          <div className={styles.pageContent} id="ContainerWidth">

            <Graphs title="Normal Solves" name="Time" data={solveTimes}/>
            <Graphs title="Solves" name="Time" data={[1,52,66,25,2]}/>
            <Graphs title="Solves" name="Time" data={[1,52,66,25,2]}/>
            <Graphs title="Solves" name="Time" data={[1,52,66,25,2]}/>
            
          </div>
        </section>
      </div>

    </div>
  )
}
