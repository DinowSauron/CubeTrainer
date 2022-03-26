import styles from "./timer.module.scss";
import { useState, useEffect } from "react"
import { getFormatedDate, milisecondsFormated, secondsFormated, minutesFormated } from "../../lib/FormatterFunctions"
import { api } from "../../services/api";
import { useScoreContext } from "../../contexts/UserScoresContext";
import { useSession } from "next-auth/react";


type ExampleProps = {
  scramble: string;
  timerType: "NormalSolver" | "BLDSolver" | "TimerSolver";
  helper: boolean;
}

export function Timer(props: ExampleProps) {

  const [timingSolve, setTimingSolve] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [startTimingPoint, setStartTimingPoint] = useState((new Date()).getTime());
  
  const {NormalSolverData, setNormalSolverData, BLDSolverData, setBLDSolverData} = useScoreContext();
  const session = useSession();

  
  function runCounter() {
    if(isCounting){
      const timer = (new Date()).getTime();
      const timerCount = timer - startTimingPoint;
      setTimingSolve(timerCount);
    }
  }
  useEffect(() => {
    setTimeout(() => {// prevent to many renders
      if(isCounting){
        runCounter();
      }
    }, 50);

  }, [timingSolve, isCounting]);




  // RECORD FUNCTIONS

  async function handleRecordTime(isDNF = false){
    const DNFpenality = isDNF? 2000:0;
    const score = {
      timer: timingSolve + DNFpenality,
      isDNF: isDNF,
      scramble: props.scramble,
      date: getFormatedDate()
    }
    const config = {
      headers: {"SolverType": props.timerType}
    }
    if(session.status === "authenticated") {
      const req = await api.post("/setRecordTime", score, config); // update DB
      if(req.status == 200) {
        handleCancelTimer();
        SaveScore(score, props.timerType); // live update without DB
      } // deie uma mensagem de erro caso não for.
    } else {
      // Se não tiver logado, apenas salva para a sessão atual.
      SaveScore(score, props.timerType);
      handleCancelTimer();
    }
  }

  function SaveScore(score, scoreType:"NormalSolver" | "BLDSolver" | "TimerSolver") {

    switch(scoreType){
      case "NormalSolver":
        setNormalSolverData([
          ...NormalSolverData,
          score
        ])
      case "BLDSolver":
        setBLDSolverData([
          ...BLDSolverData,
          score
        ])
  
      default:
        console.log("Score Salvo Com Sucesso")
    }
  
  }


  
  //  HANDLE FUNCTIONS

  function handleStopTiming() {
    setIsCounting(false);
  }
  function HandleStartTiming() {
    if(timingSolve > 0) {
      setTimingSolve(0);
    }
    setStartTimingPoint((new Date()).getTime());
    setIsCounting(true);
    runCounter()
    // setTimingSolve(0);
  }
  function handleCancelTimer() {
    setTimingSolve(0);
    setIsCounting(false);
  }
  


  const miliseconds = milisecondsFormated(timingSolve);
  const seconds = secondsFormated(timingSolve);
  const minutes = minutesFormated(timingSolve);

  return (
    <div className={styles.main}>
      
      <p className={styles.timer}>
        {minutes}{minutes != "  " && ":"}
        <span>{seconds}</span>
        <span className={styles.small}>.</span>
        <span className={styles.small}>{miliseconds}</span>
      </p>


      {timingSolve > 0 && !isCounting && (
        <div>
          <button onClick={() => handleRecordTime()}>Record Timer</button>
          <button onClick={() => handleRecordTime(true)}>Record Timer +DNF</button>
          <button onClick={() => handleCancelTimer()}>Cancel Timer</button>
        </div>
      )}


      {isCounting ? (
        <button className={styles.stopTimer} onClick={() => handleStopTiming()}>Stop Timing</button>
        ): timingSolve == 0 && (
            <button className={styles.startTimer} onClick={() => HandleStartTiming()}>Start Timing</button>
        )
      }


      {props.helper && (
        <div className={styles.helperContainer + " " + (isCounting && "shadow")}>
          <p><span>Edges:</span> <input className={styles.helper} type="text" /></p>
          <p><span>Corners:</span> <input className={styles.helper} type="text" /></p>
        </div>
      )}
    </div>
  )
}