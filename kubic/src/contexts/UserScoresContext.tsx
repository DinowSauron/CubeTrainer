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
}

export const ScoreContext = createContext({} as ScoreContextProps)

export function ScoreContextProvider(props: {children: ReactNode}) {

  const data = useSession();
  const [dataCollected, setDataCollected] = useState(false);
  const [NormalSolverData, setNormalSolverData] = useState([]);
  
  useEffect(() => {
    if(dataCollected){
      return
    }

    if(data.status === "authenticated") {
      const config = {
        headers: {
          "SolverType": "NormalSolver"
        }
      }
      api.get("/getUserScore", config)
      .then(res => {
        setNormalSolverData(res.data.data);
        setDataCollected(true);
      })
      
  
    }
  }, [data]);

  return (
    <ScoreContext.Provider value={{
      NormalSolverData,
      setNormalSolverData
    }}>
      {props.children}
    </ScoreContext.Provider>
  )
}

export function useScoreContext() {
  const scoreContext = useContext(ScoreContext);

  return scoreContext;
}