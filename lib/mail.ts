import { Routers } from '@/enum/routers';
import { VerificationToken } from '@prisma/client';
import { Resend } from 'resend';
import { headers } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);

type SendVerificationEmailTypes = Pick<VerificationToken, "email" | "token">

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

export { sendVerificationEmail }