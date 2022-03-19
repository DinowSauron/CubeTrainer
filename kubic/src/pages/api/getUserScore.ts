import { NextApiRequest, NextApiResponse} from "next";
import { getSession } from "next-auth/react";
import { getUserScores } from "../../lib/ApiFunctions";



export default async function (req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== "GET") {
    res.setHeader("Allow", "Post");
    res.status(405).end("Method not allowed")
  }

  const session = await getSession({ req });
  let userScores = await getUserScores(session) 
  const solverType = req.headers.solvertype as string;

  if(userScores == null){
    return res.status(401).send("unauthenticated");
  }
  if(!userScores.data[solverType]) {
    if(solverType !== "all"){
      return res.status(404).send("SolverType not exist in DB");
    }
  }



  if(solverType == "all"){
    return res.send({data: userScores.data})
  } else {
    return res.send({data: userScores.data[solverType]})
  }
}


