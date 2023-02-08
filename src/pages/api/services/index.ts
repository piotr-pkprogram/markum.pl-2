import nc from 'next-connect';
import { getAllServices } from 'controllers/servicesControllers';
import onError from 'middlewares/error';

const handler = nc({ onError });

handler.get(getAllServices);

export default handler;
