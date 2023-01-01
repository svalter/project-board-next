import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          // I wish to request additional permission scopes.
          scope: 'repo read:user user:email',
        },
      },
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      try {
        return {
          ...session,
          id: token.sub
        }
      } catch {
        return {
          ...session,
          id: null
        }
      }
    },
    signIn: ({ user, profile }) => {
      const { email } = user;
      try {
        return true;
      } catch (err) {
        console.log("Erro", err)
        return false;
      }
    }
  }
})
