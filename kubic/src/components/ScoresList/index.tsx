import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { useScoreContext } from "../../contexts/UserScoresContext";
import ScoreItem from "./ScoreItem";
import styles from "./scorelist.module.scss";

type ScoresListProps = {
  
  scoreType: "NormalSolver" | "BLDSolver" | "TimerSolver"
}

export function ScoresList(props: ScoresListProps) {

  const session = useSession();
  const {NormalSolverData,BLDSolverData} = useScoreContext();
  const [solverData, setSolverData] = useState([]);
  useEffect(() => {
    
    switch(props.scoreType){
      case "NormalSolver":
        setScoreDataSort(NormalSolverData);
        return;
      case "BLDSolver":
        setScoreDataSort(BLDSolverData);
        return;

      default: 
        console.error("Scorelist Need a soretype");
    }
  }, [session,NormalSolverData,BLDSolverData]);

  function setScoreDataSort(data: any[]) {
    setSolverData(data.sort((a,b) => {
      const aValue = a.date.dateInMiliseconds;
      const bValue = b.date.dateInMiliseconds;
      return bValue - aValue;
    }));
  }

  function getExtendedDate(scoreData) {
    return (scoreData.dateValue * 1000000) + scoreData.hourValue;
  }

  
  return (
    <section className={styles.main}>
      <ul>
        {solverData.map((score, index) => {
          const key = score.date.dateInMiliseconds;
          // console.log(key)
          return(
            <ScoreItem score={score} index={index} key={key}/>
          )
        }
      )}
      </ul>
    </section>
  )
}