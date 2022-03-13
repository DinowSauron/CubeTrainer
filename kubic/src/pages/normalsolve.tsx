import { useState } from "react";
import { useEffect } from "react"
import { SetDisplayVars } from "../lib/GlobalFunctions"
import styles  from "../styles/page-styles/normal-solve.module.scss"



export default function NormalSolve() {

  useEffect(() => {
    SetDisplayVars();
    window.addEventListener('resize', SetDisplayVars);
  }, [])

  const scramble = "U' L2 D' U R2 B' D' U' L2 B2 R' U' B' F' L U2 F R2 U'"

  // const [date, setDate] = useState((new Date()).getTime());
  const [miliseconds, setMiliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timing, setTiming] = useState(0);
  const [startCounter, setStartCounter] = useState(false);
  
  const [startTimingPoint, setStartTimingPoint] = useState(new Date());
  useEffect(() => {
    
    setTimeout(() => {
      if(startCounter){
        const date = (new Date()).getTime();
        setTiming(date - startTimingPoint.getTime());
        setSeconds(secondsFormated(timing));
        setMiliseconds(milisecondsFormated(timing))
      }
    }, 50);
  }, [timing,startCounter])

  function StartTiming() {
    setStartTimingPoint(new Date());
    setStartCounter(true);
    setTiming(0);
  }
  function FormatDoubleNumbers(num: string | number) {
    return num<100 ? (num<10 ? '0'+num : num) : '00';
  }

  function milisecondsFormated(ms: number) {
    const dtStr = ms.toString();
    const dtLg = dtStr.length;
    const msCount = Number((
    (Number(dtStr[dtLg-1]) + 
    (Number(dtStr[dtLg-2])*10) + 
    (Number(dtStr[dtLg-3])*100 )) / 10
    ).toFixed())

    return FormatDoubleNumbers(msCount)
  }
  function secondsFormated(ms: number) {
    if(ms < 1000){
      return 0;
    }
    const seconds = Number(Math.floor(ms / 1000).toFixed(0));
    const rest = Number(Math.floor(seconds / 100).toFixed(0)) * 100;
    const secondsCalculated = rest < seconds ? seconds-rest:-(rest-seconds) + 100;
    const secondsClamp = secondsCalculated >= 60? secondsCalculated-60:secondsCalculated
    return FormatDoubleNumbers(secondsClamp);
  }


  return (
    <section className={styles.page}>

      <div className={styles.pageContent} id="ContainerWidth">

        <div className={styles.solveContainer}>
          <h2>Normal Solver</h2>

          <p className={styles.scramble}>Scramble: <span>{scramble}</span></p>

          <div className={styles.separator}>
            <section>

            </section>
            <div> 
              
              <p className={styles.timer}>{seconds}<span>.{miliseconds}</span></p>
              {/* <p>{timer[0] +':'+ timer[1]}</p> */}
              {/* <p>{date - startTimingPoint.getTime()}</p> */}
              {/* {/*<p>{secondsFormated(8042)}</p> */}
              {/* <p>{FormatDoubleNumbers(2)}</p> */}
              <button onClick={() => StartTiming()}>Start Timing</button>
            </div>
          </div>
        </div>

      </div>
    </section>

  )
}
