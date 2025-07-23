// pages/api/auth/[...nextauth].ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Prijava",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Geslo", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<User | null> {
        const admin = {
          id: 1,
          email: "admin@example.com",
          password: "geslo123",
          role: "admin",
        };

        if (
          credentials?.email === admin.email &&
          credentials?.password === admin.password
        ) {
          return {
            id: String(admin.id),
            email: admin.email,
            role: admin.role,
          } as User;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET || "nekaj-zelo-tajnega",
};

export default NextAuth(authOptions);
