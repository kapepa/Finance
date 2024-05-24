import { deleteVerificationTokenById, getVerificationTokenByEmail } from '@/services/verification-token';
import { v4 as uuidv4 } from 'uuid';
import prisma from './db';

const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) await deleteVerificationTokenById(existingToken.id);

  const verificationToken = await prisma.verificationToken.create({
    data: {
      token,
      email,
      expires,
    }
  })

  return verificationToken;
}

export { generateVerificationToken }