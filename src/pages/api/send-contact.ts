import nc from 'next-connect';
import onError from 'middlewares/error';
import { sendContact } from 'controllers/sendEmailControllers';

const handler = nc({ onError });

handler.post(sendContact);

export default handler;
