import { v4 as uuidv4 } from 'uuid';
import prisma from './db';
import { deletePasswordResetTokenById, getPasswordResetTokenByEmail } from '@/services/reset-password-token';

const resetPassword = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingResetToken = await getPasswordResetTokenByEmail(email);
  if (existingResetToken) await deletePasswordResetTokenById(existingResetToken.id);

  const resetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token, 
      expires,
    }
  })

  return resetToken;
}

export { resetPassword }