import styles from "./timer.module.scss";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react"
import { getFormatedDate, milisecondsFormated, secondsFormated } from "../../lib/FormatterFunctions"
import { api } from "../../services/api";


type ExampleProps = {
  scramble: string;
}

export function Timer(props: ExampleProps) {

  const [miliseconds, setMiliseconds] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [timingSolve, setTimingSolve] = useState(0);
  const [startCounter, setStartCounter] = useState(false);
  const { data } = useSession()
  
  const [startTimingPoint, setStartTimingPoint] = useState((new Date()).getTime());

  
  function runTiming(reset=false) {
    if(startCounter){
      const timer = (new Date()).getTime();
      const timerCount = reset ? 0 : (timer - startTimingPoint)
      setTimingSolve(timerCount);
    }
  }
  function TimerSteps() {
    setSeconds(secondsFormated(timingSolve));
    setMiliseconds(milisecondsFormated(timingSolve))
  }
  useEffect(() => {
    setTimeout(() => {
      if(startCounter){
        runTiming();
      }
    }, 50);

    TimerSteps();
  }, [timingSolve,startCounter]);




  function handleStopTiming() {
    setTimingSolve(timingSolve)
    setStartCounter(false);

  }
  function HandleStartTiming() {
    setStartTimingPoint((new Date()).getTime());
    setStartCounter(true);
    runTiming(true)
    // setTimingSolve(0);
  }

  function handleAddSeconds(seconds: number) {
    setTimingSolve(timingSolve + (seconds * 1000))
  }
  

  async function handleRecordTime(){
    const params = {
      timer: timingSolve,
      isDNF: false,
      scramble: props.scramble,
      date: getFormatedDate()
    }

    const config = {
      headers: {
        "SolverType": "NormalSolver"
      }
    }

    const req = await api.post("/recordTime",params,config);
    console.log(req)
  }


  return (
    <div className={styles.main}>
      
      <p className={styles.timer}>{seconds}<span>.{miliseconds}</span></p>
      <p>{data&&data.type}</p>
      {timingSolve > 0 && !startCounter && (
        <div>
          <button onClick={() => handleRecordTime()}>Record Timer</button>
          <button onClick={() => handleAddSeconds(2)}>Record Timer +DNF</button>
          <button onClick={() => handleAddSeconds(2)}>Cancel Timer</button>
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