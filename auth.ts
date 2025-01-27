import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import GitHub from "next-auth/providers/github";
import Gitee from "./providers/gitee";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/sign-in",
    signOut: "/",
    // newUser: "/auth/new-user",
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Gitee({
      clientId: process.env.GITEE_CLIENT_ID,
      clientSecret: process.env.GITEE_CLIENT_SECRET,
    }),
  ],
  trustHost: true,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  debug: false,
  callbacks: {
    async session({
      session,
      // user
    }) {
      // const signingSecret = process.env.SUPABASE_JWT_SECRET;
      // if (signingSecret) {
      //   const payload = {
      //     aud: "authenticated",
      //     exp: Math.floor(new Date(session.expires).getTime() / 1000),
      //     sub: user.id,
      //     email: user.email,
      //     role: "authenticated",
      //   };
      //   session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      // }
      // session.userId = user.id ;
      return session;
    },
  },
});
