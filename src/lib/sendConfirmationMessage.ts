// Example: Send confirmation email using Resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

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
    subject: 'Confirm your signup for AI Mind OS',
    html: `<p>Welcome! Click to confirm your signup: <a href='${confirmUrl}'>Confirm</a></p>`,
  });
}

// Example: Send Telegram DM using Bot API
export async function sendTelegramDM({
  chatId,
  confirmUrl,
}: {
  chatId: string;
  confirmUrl: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: `Welcome! Click to confirm your signup: ${confirmUrl}`,
    }),
  });
}
