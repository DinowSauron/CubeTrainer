
import { NextApiRequest, NextApiResponse} from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { getUserScores } from "../../lib/ApiFunctions";
import { q, fauna} from "../../services/fauna"



export default async function (req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== "POST") {
    res.setHeader("Allow", "Post");
    res.status(405).end("Method not allowed")
  }

  const session = await getSession({ req });

  let userScores = await getUserScores(session) 
  const solverData = req.body;
  const solverType = req.headers.solvertype as string


  if(userScores == null){
    return res.status(401).send("unauthenticated");
  }
  if(!userScores.data[solverType]) {
    return res.status(404).send("SolverType not exist in DB");
  }

  userScores.data[solverType] = [
    ...userScores.data[solverType],
    solverData
  ] 
  
  const updateStatus = await updateScore(userScores)
  
  if(updateStatus.success){
    return res.status(200).send({});
  }else {
    const statusCode = updateStatus.errorMsg.statusCode
    return res.status(statusCode).send("Bad Request");
  } 
}



async function updateScore(ScoreData) {
  try {
    await fauna.query( // atualiza adicionando o novo score
      q.Update(
        q.Ref(q.Collection("UserScore"), ScoreData.ref.id),
        {
          data: ScoreData.data
        }
      )
    )

    return {success: true}
  } catch(err) {
    console.log("Dados não salvos")
    return {
      success: false,
      error: true,
      errorMsg: err
    }
  }
}

