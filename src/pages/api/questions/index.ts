import nc from 'next-connect';
import { getAllQuestions } from 'controllers/questionsControllers';
import onError from 'middlewares/error';

const handler = nc({ onError });

handler.get(getAllQuestions);

export default handler;
