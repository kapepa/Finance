import prisma from "@/lib/db";
import { VerificationToken } from "@prisma/client";

const getVerificationTokenByEmail = async (email: string): Promise<VerificationToken | null> => {
  try {
    const verification = await prisma.verificationToken.findFirst({
      where: {
        email
      }
    });

    return verification;
  } catch { 
    return null;
  }
}


const getVerificationTokenByToken = async (token: string): Promise<VerificationToken | null> => {
  try {
    const verification = await prisma.verificationToken.findUnique({
      where: {
        token
      }
    });

    return verification;
  } catch { 
    return null;
  }
}

const deleteVerificationTokenById = async (id: string): Promise<VerificationToken> => {
  return await prisma.verificationToken.delete({
    where: {
      id
    }
  })
}

export { getVerificationTokenByEmail, getVerificationTokenByToken, deleteVerificationTokenById }