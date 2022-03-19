import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../services/api";
import ScoreItem from "./ScoreItem";
import styles from "./scorelist.module.scss";

type ScoresListProps = {
  
  timerType: "NormalSolver" | "BLDSolver" | "TimerSolver"
}

export function ScoresList(props: ScoresListProps) {

  const data = useSession();
  const [scoreData, setScoreData] = useState([]);
  useEffect(() => {
    if(data.status === "authenticated") {
      const config = {
        headers: {
          "SolverType": props.timerType
        }
      }
      api.get("/getUserScore", config)
      .then(res => {setScoreData(res.data.data)})
    }
  }, [data])



  return (
    <section className={styles.main}>
      {scoreData.map((score, index) => {
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