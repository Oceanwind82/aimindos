import crypto from 'crypto';

export async function sendConfirmation({ id }: { id: string }) {
  // Generate a random token
  const token = crypto.randomBytes(24).toString('hex');

  // For demo, just use in link
  const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/signup/confirm?id=${id}&token=${token}`;

  // Send email (replace with your email provider)
  // Example: using nodemailer, resend, or any transactional email API
  // await sendEmail({
  //   to: email,
  //   subject: "Confirm your signup",
  //   html: `<p>Click to confirm: <a href='${confirmUrl}'>Confirm</a></p>`
  // });

  // For Telegram, send DM via bot API
  // await sendTelegramDM({
  //   chatId: ..., // look up by email or user
  //   text: `Click to confirm: ${confirmUrl}`
  // });

  return confirmUrl;
}
