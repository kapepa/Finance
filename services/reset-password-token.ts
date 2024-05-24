import prisma from "@/lib/db"
import { PasswordResetToken } from "@prisma/client"

const getPasswordResetTokenByEmail = async (email: string): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        email
      }
    })

    return passwordResetToken;
  } catch {
    return null
  }
}

const getPasswordResetTokenByToken = async (token: string): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token
      }
    })

    return passwordResetToken;
  } catch {
    return null
  }
}

const deletePasswordResetTokenById = async (id: string): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.delete({
      where: {
        id
      }
    })

    return passwordResetToken;
  } catch {
    return null
  }
}

export { getPasswordResetTokenByEmail, getPasswordResetTokenByToken, deletePasswordResetTokenById }