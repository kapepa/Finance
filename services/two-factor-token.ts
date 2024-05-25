import prisma from "@/lib/db"
import { TwoFactorToken } from "@prisma/client";

const getTwoFactorTokenByToken = async (token: string): Promise<TwoFactorToken | null> => {
  try {
    const factorToken = await prisma.twoFactorToken.findUnique({
      where: {
        token,
      }
    });

    return factorToken
  } catch {
    return null
  }
}

const getTwoFactorTokenByEmail = async (email: string): Promise<TwoFactorToken | null> => {
  try {
    const factorToken = await prisma.twoFactorToken.findUnique({
      where: {
        email,
      }
    });

    return factorToken
  } catch {
    return null
  }
}

const deleteTwoFactorTokenById = async (id: string): Promise<TwoFactorToken | null> => {
  try {
    const factorToken = await prisma.twoFactorToken.delete({
      where: {
        id,
      }
    });

    return factorToken
  } catch {
    return null
  }
}

export { getTwoFactorTokenByToken, getTwoFactorTokenByEmail, deleteTwoFactorTokenById }