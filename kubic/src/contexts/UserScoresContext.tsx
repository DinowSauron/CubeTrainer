import { useSession } from "next-auth/react";
import { useEffect, ReactNode, useContext, useState, createContext } from "react";
import { api } from "../services/api";

type score = {
  timer: number,
  isDNF: boolean,
  scramble: string,
  date: {
    dateString: string,
    hourString: string,
    dateValue: number,
    hourValue: number
  }
}
type ScoreContextProps = {
  NormalSolverData: score[];
  setNormalSolverData: (agr0: score[]) => void;
  BLDSolverData: score[];
  setBLDSolverData: (agr0: score[]) => void;
}

export const ScoreContext = createContext({} as ScoreContextProps)

export function ScoreContextProvider(props: {children: ReactNode}) {

  const session = useSession();
  const [dataCollected, setDataCollected] = useState({isCollected:false, userEmailCollected:"email@email.com"});
  const [NormalSolverData, setNormalSolverData] = useState([]);
  const [BLDSolverData, setBLDSolverData] = useState([]);
  
  useEffect(() => {
    if(!session.data) {
      return;
    }

    // Não atualiza caso já possui os dados dos scores.
    // Previne de ficar com score do usuário anterior após um novo login
    const userEmail = session.data.user.email;
    const dataEmail = dataCollected.userEmailCollected
    if(dataCollected.isCollected == true && dataEmail === userEmail){
      return;
    }
    
    let isApiSubscribed = true; // resolve memory leak

    if(session.status === "authenticated") {
      console.log("Data request...")
      
      const config = {
        headers: {
          "SolverType": "all"
        }
      }
      api.get("/getUserScore", config).then(res => {
        // console.log(res.data);
        if(isApiSubscribed){ // resolve memory leak
          const data = res.data.data;
          setNormalSolverData(data["NormalSolver"]);
          setBLDSolverData(data["BLDSolver"]);
          
          setDataCollected({
            isCollected: true,
            userEmailCollected: userEmail
          });
        }
      })
    }

    return () => { // resolve memory leak
      isApiSubscribed = false
    }

  }, [session]);

  return (
    <ScoreContext.Provider value={{
      NormalSolverData,
      setNormalSolverData,
      BLDSolverData,
      setBLDSolverData,
    }}>
      {props.children}
    </ScoreContext.Provider>
  )
}

export function useScoreContext() {
  const scoreContext = useContext(ScoreContext);

  return scoreContext;
}