const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function enviarEmailAtividade(destinatario: any, atividade: { titulo: any; dataLimite: string | number | Date; }) {
  await transporter.sendMail({
    from: `"Gerenciador de Atividades" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: `Lembrete: ${atividade.titulo}`,
    html: `
      <p>Sua atividade <strong>${atividade.titulo}</strong> está vencendo!</p>
      <p>Prazo: ${new Date(atividade.dataLimite).toLocaleString('pt-BR')}</p>
    `,
  });
}

module.exports = { enviarEmailAtividade };