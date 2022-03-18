
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

  const session = await getSession({ req });

  // const userScores = await getUserScores(session) 
  const userScores = { // test data
    ref: 555,
    ts: 1647563715015000,
    data: {
      user: { email: 'luiz.deadzone@gmail.com' },
      SolverNormal: [ 32, 55, 55 ]
    }
  }



  if(userScores){

    console.log(userScores)

    userScores.data.SolverNormal?
    userScores.data.SolverNormal = [
      ...userScores.data.SolverNormal,
      55
    ] : userScores.data.SolverNormal = [32]
    
    
    /*
    const updateStatus = await updateScore(userScores)
    
    if(updateStatus.success){
      return res.status(200);
    }else {
      const statusCode = updateStatus.errorMsg.statusCode
      return res.status(statusCode).send("Bad Request");
    } //*/
  }

  

  // se o usuário não tiver nenhum score, um novo é criado
  // se ele tiver, e atualizado de acordo com o userScores 


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

/**
 * @param session Sessão atual 
 * @returns Scores do Usuário
 */
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
        q.Collection("UserScore"),
        { 
          data: { user: {email: user.email} }
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