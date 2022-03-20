import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { useScoreContext } from "../../contexts/UserScoresContext";
import { api } from "../../services/api";
import ScoreItem from "./ScoreItem";
import styles from "./scorelist.module.scss";

type ScoresListProps = {
  
  timerType: "NormalSolver" | "BLDSolver" | "TimerSolver"
}

export function ScoresList(props: ScoresListProps) {

  const data = useSession();
  const {NormalSolverData} = useScoreContext();
  /*useEffect(() => {
  }, [data])*/



  return (
    <section className={styles.main}>
      {NormalSolverData.map((score, index) => {
        const key = (score.date.dateValue * 1000000) + score.date.hourValue;
        // console.log(key)
        return(
          <ScoreItem score={score} index={index} key={key}/>
        )
      }
      )}
    </section>
  )
}