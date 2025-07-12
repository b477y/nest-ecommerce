import {
  BadGatewayException,
  InternalServerErrorException,
} from '@nestjs/common';
import { createTransport, Transporter, SendMailOptions } from 'nodemailer';

// to: 'bar@example.com, baz@example.com',
// subject: 'Hello ✔',
// text: 'Hello world?', // plain‑text body
// html: '<b>Hello world?</b>', // HTML body

export const sendEmail = async (data: SendMailOptions) => {
  try {
    if (!data.to && !data.bcc && !data.cc) {
      throw new BadGatewayException('In-valid email destination');
    }

    if (!data.text && !data.html && !data.attachments?.length) {
      throw new BadGatewayException('In-valid email destination');
    }

    const transporter: Transporter = createTransport({
      host: 'smtp.gmail.email',
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Nester" <${process.env.EMAIL}>`,
      ...data,
    });

    console.log('Message sent:', info.messageId);
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
};
