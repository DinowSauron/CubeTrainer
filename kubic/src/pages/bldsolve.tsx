import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react"
import { ScoresList } from "../components/ScoresList";
import { Timer } from "../components/Timer";
import { SetDisplayVars } from "../lib/GlobalFunctions"
import { api } from "../services/api";
import styles  from "../styles/page-styles/normal-solve.module.scss"



export default function NormalSolve() {

  useEffect(() => {
    SetDisplayVars();
    window.addEventListener('resize', SetDisplayVars);
  }, [])

  const scramble = "U' L2 D' U R2 B' D' U' L2 B2 R' U' B' F' L U2 F R2 U'"



  return (
    <section className={styles.page}>

      <div className={styles.pageContent} id="ContainerWidth">

        <div className={styles.solveContainer}>
          <h2>Blindfold Solver</h2>

          <p className={styles.scramble}>Scramble: <span>{scramble}</span></p>

          <div className={styles.separator}>
            <ScoresList scoreType="BLDSolver"/>
            <div> 
              <Timer scramble={scramble} timerType={"BLDSolver"} helper/>
            </div>
          </div>
        </div>

      </div>
    </section>

  )
}
