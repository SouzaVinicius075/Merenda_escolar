import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: "email-ssl.com.br",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "vinicius.souza@2g2m.com.br",
    pass: "Cacs@2234",
  },
});

export default transporter