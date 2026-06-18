import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        phone: { label: "Phone", type: "text" },
        code: { label: "OTP Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.code) {
          console.log("❌ Missing credentials");
          return null;
        }

        console.log("🔐 Authorizing:", credentials.phone, credentials.code);

        try {
          const url = `${API_URL}/api/auth/verify-otp`;
          console.log("📡 Calling:", url);

          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: credentials.phone,
              code: credentials.code,
            }),
          });

          const json = await res.json();
          console.log("📦 Response:", res.status, JSON.stringify(json));

          if (!res.ok || !json.success) {
            console.log("❌ Auth failed:", json?.message);
            return null;
          }

          const { token, refreshToken, isProfileComplete, isBranchAdmin, user } =
            json.data;

          return {
            id: user.id,
            name: user.name,
            phone: user.phone,
            role: isBranchAdmin ? "admin" : "super_admin",
            isBranchAdmin,
            accessToken: token,
            refreshToken,
            isProfileComplete,
          };
        } catch (err) {
          console.log("💥 Error:", err);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" as const },

  pages: {
    signIn: "/ar/login",
    error: "/ar/login", // ← بدل /api/auth/error نرجع للـ login
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone = user.phone;
        token.role = user.role;
        token.isBranchAdmin = user.isBranchAdmin;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.isProfileComplete = user.isProfileComplete;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user = {
        id: token.id,
        name: token.name,
        phone: token.phone,
        role: token.role,
        isBranchAdmin: token.isBranchAdmin,
      };
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.isProfileComplete = token.isProfileComplete;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
