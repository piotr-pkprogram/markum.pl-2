import nc from 'next-connect';
import { getAllEstates } from 'controllers/estatesControllers';
import onError from 'middlewares/error';

const handler = nc({ onError });

handler.get(getAllEstates);

export default handler;
