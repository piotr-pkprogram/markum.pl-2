import nc from 'next-connect';
import { getAllReviews } from 'controllers/reviewsControllers';
import onError from 'middlewares/error';

const handler = nc({ onError });

handler.get(getAllReviews);

export default handler;
