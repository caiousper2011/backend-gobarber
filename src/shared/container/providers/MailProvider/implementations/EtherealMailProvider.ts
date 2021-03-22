import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: 'Equipe Caio <caio.almeida@gmail.com',
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log(message);
    console.log(nodemailer.getTestMessageUrl(message));
  }
}
