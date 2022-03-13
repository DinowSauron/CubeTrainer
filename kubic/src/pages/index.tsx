import { useEffect } from "react"
import { Graphs } from "../components/Graphs"
import { SetDisplayVars } from "../lib/GlobalFunctions"
import styles  from "../styles/page-styles/index.module.scss"



export default function Index() {


  
  useEffect(() => {
    
    SetDisplayVars();
    window.addEventListener('resize', SetDisplayVars);
  }, [])
  
  const solveTimes = [25,32,19,29,24,18,19,32,26,24]

  return (
    <section className={styles.page}>

      <div className={styles.pageContent} id="ContainerWidth">


        <Graphs title="Normal Solves" name="Time" data={solveTimes}/>
        <Graphs title="BLD Solves" name="Time" data={[1,52,66,25,2]}/>
        <Graphs title="21Solves" name="Time" data={[1,52,66,25,2]}/>
        <Graphs title="2Solves" name="Time" data={[1,5]}/>
        <Graphs title="3Solves" name="Time" data={[1,52,66,25,2]}/>
        <Graphs title="4Solves" name="Time" data={[1,52,66,25,2]}/>
        <Graphs title="5Solves" name="Time" data={[1,52,66,25,2]}/>
        <Graphs title="6Solves" name="Time" data={[1,52,66,25,2]}/>
        <Graphs title="7Solves" name="Time" data={[1,52,66,25,2]}/>
        <Graphs title="8Solves" name="Time" data={[1,52,66,25,2]}/>
        
      </div>
    </section>

  )
}
