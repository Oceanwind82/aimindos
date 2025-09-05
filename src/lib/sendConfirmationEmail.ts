import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail({
  email,
  confirmUrl,
}: {
  email: string;
  confirmUrl: string;
}) {
  await resend.emails.send({
    from: 'noreply@aimindos.com',
    to: email,
    subject: 'Confirm your AI Mind OS signup',
    html: `<p>Welcome! Please confirm your signup by clicking the link below:</p><p><a href="${confirmUrl}">Confirm your signup</a></p>`,
  });
}
