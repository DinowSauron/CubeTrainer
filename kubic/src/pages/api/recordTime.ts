
import { NextApiRequest, NextApiResponse} from "next";
import { getSession } from "next-auth/react";

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const session = await getSession({ req });

  console.log(session)



  return res.status(200)
}