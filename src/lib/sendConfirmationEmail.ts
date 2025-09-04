type SendConfirmationEmailParams = {
  email: string;
  confirmUrl: string;
};

export async function sendConfirmationEmail({
  email,
  confirmUrl,
}: SendConfirmationEmailParams): Promise<void> {
  // Implement email sending logic here, e.g., using nodemailer or an external service.
  // For now, just simulate sending.
  console.log(`Confirmation email sent to ${email} with link: ${confirmUrl}`);
}
