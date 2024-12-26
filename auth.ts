import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import GitHub from "next-auth/providers/github";

// async function generateJWT(payload, secret) {
//   const encoder = new TextEncoder();
//   const key = await crypto.subtle.importKey(
//     "raw",
//     encoder.encode(secret),
//     { name: "HMAC", hash: "SHA-256" },
//     false,
//     ["sign"]
//   );

//   const header = {
//     alg: "HS256",
//     typ: "JWT",
//   };

//   const encodedHeader = btoa(JSON.stringify(header));
//   const encodedPayload = btoa(JSON.stringify(payload));

//   const signature = await crypto.subtle.sign(
//     "HMAC",
//     key,
//     encoder.encode(`${encodedHeader}.${encodedPayload}`)
//   );
//   const encodedSignature = btoa(
//     String.fromCharCode(...new Uint8Array(signature))
//   );

//   return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  trustHost: true,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  debug: false,
  callbacks: {
    // async session({ session, user }) {
    //   const signingSecret = process.env.SUPABASE_JWT_SECRET!;
    //   if (signingSecret) {
    //     const payload = {
    //       aud: "authenticated",
    //       exp: Math.floor(new Date(session.expires).getTime() / 1000),
    //       sub: user.id,
    //       email: user.email,
    //       role: "authenticated",
    //     };
    //     console.log(user, ">>");
    //     generateJWT(payload, signingSecret).then((token) => {
    //       console.log("Generated JWT:", token);
    //       // console.log("JWT WEB TOKEN", jwt.sign(payload, signingSecret));
    //     });
    //     // session.supabaseAccessToken = btoa(
    //     //   String.fromCharCode(...new Uint8Array(signature))
    //     // );
    //     // session.supabaseAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzM3NzM5MzIwLCJzdWIiOiI2MDcwZGQ1Yi1lNmUxLTRhNTYtYmZkOC01ZjM3M2Y3NWU1ZWUiLCJlbWFpbCI6ImgyMTYzMjAzODMwQDE2My5jb20iLCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTczNTE0NzMyN30.rTnFsDoJXGYJPJSuD5_LLLaSZA7vXH9MR0flPosPpV0`;
    //     session.supabaseAccessToken = jwt.sign(payload, signingSecret);
    //     console.log("Supabase Access Token:", session.supabaseAccessToken);
    //   }
    //   return session;
    // },
  },
});
