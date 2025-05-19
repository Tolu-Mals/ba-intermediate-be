import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const testRouter = Router();

testRouter.all('*', (_, res) => {
  res.status(StatusCodes.OK).json({ message: 'Server is up ✅' });
});

export default testRouter;
