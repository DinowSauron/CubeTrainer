import styles from "./timer.module.scss";
import { useState, useEffect } from "react"
import { getFormatedDate, milisecondsFormated, secondsFormated } from "../../lib/FormatterFunctions"
import { api } from "../../services/api";
import { useScoreContext } from "../../contexts/UserScoresContext";


type ExampleProps = {
  scramble: string;
  timerType: "NormalSolver" | "BLDSolver" | "TimerSolver"
}

export function Timer(props: ExampleProps) {

  const [miliseconds, setMiliseconds] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [timingSolve, setTimingSolve] = useState(0);
  const [startCounter, setStartCounter] = useState(false);
  const [startTimingPoint, setStartTimingPoint] = useState((new Date()).getTime());
  
  const {NormalSolverData, setNormalSolverData} = useScoreContext();
  

  
  function runTiming() {
    if(startCounter){
      const timer = (new Date()).getTime();
      const timerCount = timer - startTimingPoint;
      setTimingSolve(timerCount);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      if(startCounter){
        runTiming();
      }
    }, 50);

    setSeconds(secondsFormated(timingSolve));
    setMiliseconds(milisecondsFormated(timingSolve));
  }, [timingSolve, startCounter]);




  // RECORD FUNCTIONS

  async function handleRecordTime(isDNF = false){
    const score = {
      timer: timingSolve + (isDNF?2000:0),
      isDNF: isDNF,
      scramble: props.scramble,
      date: getFormatedDate()
    }
    const config = {
      headers: {"SolverType": props.timerType}
    }

    const req = await api.post("/setRecordTime",score,config); // update DB
    if(req.status == 200) {
      handleCancelTimer();
      SaveScore(score, props.timerType); // live update without DB
    } // deie uma mensagem de erro caso não for
  }

  function SaveScore(score, scoreType:"NormalSolver" | "BLDSolver" | "TimerSolver") {

    switch(scoreType){
      case "NormalSolver":
        setNormalSolverData([
          ...NormalSolverData,
          score
        ])
  
      default:
        console.log("Score Salvo Com Sucesso")
    }
  
  }


  
  //  HANDLE FUNCTIONS

  function handleStopTiming() {
    setStartCounter(false);
  }
  function HandleStartTiming() {
    if(timingSolve > 0) {
      setTimingSolve(0);
    }
    setStartTimingPoint((new Date()).getTime());
    setStartCounter(true);
    runTiming()
    // setTimingSolve(0);
  }
  function handleCancelTimer() {
    setTimingSolve(0);
    setStartCounter(false);
  }
  

  return (
    <div className={styles.main}>
      
      <p className={styles.timer}>{seconds}<span>.{miliseconds}</span></p>
      {timingSolve > 0 && !startCounter && (
        <div>
          <button onClick={() => handleRecordTime()}>Record Timer</button>
          <button onClick={() => handleRecordTime(true)}>Record Timer +DNF</button>
          <button onClick={() => handleCancelTimer()}>Cancel Timer</button>
        </div>
      )}
      {startCounter ? (
        <button className={styles.stopTimer} onClick={() => handleStopTiming()}>Stop Timing</button>
        ): timingSolve == 0 && (
            <button className={styles.startTimer} onClick={() => HandleStartTiming()}>Start Timing</button>
        )
      }
    </div>
  )
}