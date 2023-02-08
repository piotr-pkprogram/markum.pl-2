import nc from 'next-connect';
import { getAllContacts } from 'controllers/contactsControllers';
import onError from 'middlewares/error';

const handler = nc({ onError });

handler.get(getAllContacts);

export default handler;
