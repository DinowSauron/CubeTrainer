import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { useScoreContext } from "../../contexts/UserScoresContext";
import { api } from "../../services/api";
import ScoreItem from "./ScoreItem";
import styles from "./scorelist.module.scss";

type ScoresListProps = {
  
  scoreType: "NormalSolver" | "BLDSolver" | "TimerSolver"
}

export function ScoresList(props: ScoresListProps) {

  const data = useSession();
  const {NormalSolverData} = useScoreContext();
  const [solverData, setSolverData] = useState([]);
  useEffect(() => {
    switch(props.scoreType){
      case "NormalSolver":
        setSolverData(NormalSolverData.sort((a,b) => {
          const aValue = getExtendedDate(a.date);
          const bValue = getExtendedDate(b.date);
          return bValue - aValue;
        }));


        return;
      default: 
        console.log("No solver Data")
    }
  }, [NormalSolverData])

  function getExtendedDate(scoreData) {
    return (scoreData.dateValue * 1000000) + scoreData.hourValue;
  }

  
  return (
    <section className={styles.main}>
      {solverData.map((score, index) => {
        const key = getExtendedDate(score.date);
        // console.log(key)
        return(
          <ScoreItem score={score} index={index} key={key}/>
        )
      }
      )}
    </section>
  )
}