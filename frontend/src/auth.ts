import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.idToken = account.id_token;
        token.googleId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.sub || token.googleId) as string;
        (session as any).idToken = token.idToken;
        (session as any).googleId = token.googleId;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      return true;
    },
  },
});
