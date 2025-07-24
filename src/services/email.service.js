import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function isEmailServiceEnabled() {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    return false;
  }
}

export async function sendPasswordResetEmail(to, resetLink) {
  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to,
    subject: "Restablecer contraseña",
    html: `
      <h2>Solicitud para reestablecer tu contraseña</h2>
      <p>Clickea el botón para modificar tu contraseña. El enlace expira en 1 hora.</p>
      <a href="${resetLink}" style="padding: 2% 5%; background: black; color: white; text-decoration: none; border-radius: 1px;">
        Restablecer Contraseña
      </a>
    `,
  };

  return transporter.sendMail(mailOptions);
}
