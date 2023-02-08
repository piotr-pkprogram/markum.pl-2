import nc from 'next-connect';
import onError from 'middlewares/error';
import { getAllData } from 'controllers/getAllController';

const handler = nc({ onError });

handler.get(getAllData);

export default handler;
