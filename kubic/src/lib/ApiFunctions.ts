import { Session } from "next-auth";
import { fauna, q } from "../services/fauna";

type UserScore = {
  ref: {
    id: string;
  }
  data: {
    SolverNormal: Number[],
    SolverBLD: Number[]
  }
}

/**
 * Recupera todos os scores do banco de dados
 */
export async function getUserScores(session: Session) {
  if(!session){
    return null;
  }

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
