import { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import { createNewContact } from 'controllers/contactsControllers';
import { NextFunction } from 'connect';

export const sendContact = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextFunction
) => {
  try {
    const inputs = req.body.inputs;
    req.body = {
      name: inputs[0].value,
      phoneNumber: inputs[1].value
    };

    await createNewContact(req, res);

    res.status(200).json({
      success: true,
      message: 'Create new contact successfully'
    })
  } catch (e) {
    // @ts-ignore
    res.status(e.status | 500).json({
      success: true,
      error: e
    })
  }
};
