import { IGlobalVariable } from '@automatischtest1/types';
import nodemailer, { TransportOptions } from 'nodemailer';

const transporter = ($: IGlobalVariable) => {
  return nodemailer.createTransport({
    host: $.auth.data.host,
    port: $.auth.data.port,
    secure: $.auth.data.useTls,
    auth: {
      user: $.auth.data.username,
      pass: $.auth.data.password,
    },
  } as TransportOptions);
};

export default transporter;
