import { Routers } from '@/enum/routers';
import { PasswordResetToken, TwoFactorToken, VerificationToken } from '@prisma/client';
import { Resend } from 'resend';
import { headers } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);

type SendVerificationEmailTypes = Pick<VerificationToken, "email" | "token">
type SendPasswordResetTokenTypes = Pick<PasswordResetToken, "email" | "token">
type SendTwoFactorTokenEmailTypes = Pick<TwoFactorToken, "email" | "token">

const sendVerificationEmail = async ({ email, token }: SendVerificationEmailTypes) => {
  const headersList = headers();
  const domain = headersList.get('host') || "";
  const confirmLink = `http://${domain}${Routers.NewVerification}?token=${token}`

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email!,
    subject: 'Confirm your email',
    html: `<p>Click <a href='${confirmLink}'>here</a> to confirm email.</p>`
  });
}

const sendPasswordResetToken = async ({ email, token }: SendPasswordResetTokenTypes) => {
  const headersList = headers();
  const domain = headersList.get('host') || "";
  const confirmLink = `http://${domain}${Routers.NewPassword}?token=${token}`

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email!,
    subject: 'Reset your password',
    html: `<p>Click <a href='${confirmLink}'>here</a> to reset password</p>`
  });
}

const sendTwoFactorTokenEmail = async ({ email, token }: SendTwoFactorTokenEmailTypes) => {
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email!,
    subject: '2FA code',
    html: `<p>Your 2FA code: ${token}</p>`
  });
}

export { sendVerificationEmail, sendPasswordResetToken, sendTwoFactorTokenEmail }