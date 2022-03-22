import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { q, fauna} from "../../../services/fauna"


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
    // ...add more providers here
  ],
  theme: {
    colorScheme: "dark",
    brandColor: "#3dc98d", 
    logo: "/images/branding-logo.png",
  },
  jwt: {
    secret: process.env.HASH_KEY
  },
  secret: process.env.HASH_KEY,
  callbacks: {
    /*async session({session, token}) {
 
      //console.log(token)

      return session
    },*/
    async signIn(params) {
      const user = params.user

      // Send properties to the client, like an access_token from a provider.
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index("user_by_email"),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection("Users"),
              { 
                data: {
                  name: user.name,
                  email: user.email
                }
              }
            ),
            q.Get(
              q.Match(
                q.Index("user_by_email"),
                q.Casefold(user.email)
              )
            )
          )
        )
      } catch(err) {
        return false 
      }

      return true
    }
  }
})
