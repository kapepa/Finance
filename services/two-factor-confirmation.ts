import prisma from "@/lib/db"
import { TwoFactorConfirmation } from "@prisma/client";

const getTwoFactorConfirmationByUserId = async (userId: string): Promise<TwoFactorConfirmation | null> => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({
      where: {
        userId
      }
    })

    return twoFactorConfirmation;
  } catch {
    return null
  }
}

const deleteTwoFactorConfirmationById = async (id: string): Promise<TwoFactorConfirmation | null> => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.delete({
      where: {
        id
      }
    })

    return twoFactorConfirmation;
  } catch {
    return null
  }
}

export { getTwoFactorConfirmationByUserId, deleteTwoFactorConfirmationById }