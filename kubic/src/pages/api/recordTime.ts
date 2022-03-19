
import { NextApiRequest, NextApiResponse} from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { q, fauna} from "../../services/fauna"

type User = {
  email: string;
} | null

type UserScore = {
  ref: {
    id: string;
  }
  data: {
    SolverNormal: Number[],
    SolverBLD: Number[]
  }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== "POST") {
    res.setHeader("Allow", "Post");
    res.status(405).end("Method not allowed")
  }

  const session = await getSession({ req });

  let userScores = await getUserScores(session) 


  if(userScores != null){

    const solverData = req.body;
    const solverType = req.headers.solvertype as string

    if(!userScores.data[solverType]) {
      return res.status(404).send("SolverType not exist in DB");
    }

    userScores.data[solverType] = [
      ...userScores.data[solverType],
      solverData
    ] 
    
    const updateStatus = await updateScore(userScores)
    
    if(updateStatus.success){
      return res.status(200);
    }else {
      const statusCode = updateStatus.errorMsg.statusCode
      return res.status(statusCode).send("Bad Request");
    } //
  }

  



  return res.status(200)
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


async function getUserScores(session: Session) {

  function getUserFromSession(session: Session){
    if(!session.user || !session.user.email) {
      return null;
    }
    var user = session.user;
    return user;
  }

  const user = getUserFromSession(session);

  if(user == null) {
    return null;
  }

  const request = await fauna.query<UserScore>(
    q.If(
      q.Not(
        q.Exists(
          q.Match(
            q.Index("user_scores_by_email"),
            q.Casefold(user.email)
          )
        )
      ),
      q.Create( // se não existir, cria um novo
        q.Collection("UserScore"), // Criação dos dados no DB
        { 
          data: { 
            user: {email: user.email},
            NormalSolver: [],
            BLDSolver: [],
            TimerSolver: []
          }
        }
      ),
      q.Get( // se existir, pega os scores atual
        q.Match(
          q.Index("user_scores_by_email"),
          q.Casefold(user.email)
        )
      )
    )
  )

  return request;
}
