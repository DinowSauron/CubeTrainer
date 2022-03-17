
import { NextApiRequest, NextApiResponse} from "next";
import { getSession } from "next-auth/react";
import { q, fauna} from "../../services/fauna"

type User = {
  ref: {
    id: string;
  }
  data: {
    nome: string;
    email: string;
  }
}

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

  // pega as informações do usuário
  const user = await fauna.query<User>(
    q.Get(
      q.Match(
        q.Index("user_by_email"),
        q.Casefold(session.user.email)
      )
    )
  )

  // Cria os scores do usuário
  const userScores = await fauna.query<UserScore>(
    q.If(
      q.Not(
        q.Exists(
          q.Match(
            q.Index("scores_by_user_id"),
            q.Casefold(user.ref.id)
          )
        )
      ),
      q.Create( // se não existir, cria um novo
        q.Collection("UserScore"),
        { 
          data: { userId: user.ref.id }
        }
      ),
      q.Get( // se existir, pega os scores atual
        q.Match(
          q.Index("scores_by_user_id"),
          q.Casefold(user.ref.id)
        )
      )
    )
  )
  console.log(userScores)

  userScores.data.SolverNormal?
  userScores.data.SolverNormal = [
    ...userScores.data.SolverNormal,
    55
  ] : userScores.data.SolverNormal = [32]

  await fauna.query( // atualiza adicionando o novo score
    q.Update(
      q.Ref(q.Collection("UserScore"), userScores.ref.id),
      {
        data: userScores.data
      }
    )
  )
  

  

  // se o usuário não tiver nenhum score, um novo é criado
  // se ele tiver, e atualizado de acordo com o userScores 


  return res.status(200)
}