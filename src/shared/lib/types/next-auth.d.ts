import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email?: string | null
      image?: string | null
      phone: string
      role: string
    }
    accessToken: string
    refreshToken: string
    isProfileComplete: boolean
  }

  interface User {
    id: string
    name: string
    phone: string
    role: string
    accessToken: string
    refreshToken: string
    isProfileComplete: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name: string
    phone: string
    role: string
    accessToken: string
    refreshToken: string
    isProfileComplete: boolean
  }
}