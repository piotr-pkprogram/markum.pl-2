import nc from 'next-connect';
import { getAllEstates } from 'controllers/estatesControllers';
import { uploadOffersFromCRM as uploadEstates } from 'utils/uploadOffersFromCRM';
import onError from 'middlewares/error';

const handler = nc({ onError });

handler.get(getAllEstates);
handler.post(uploadEstates);

export default handler;
