import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const healthCheckRouter = Router();

healthCheckRouter.all('/status', (_, response) => {
  response.status(StatusCodes.OK).json({ message: 'Server is up ✅' });
});

export default healthCheckRouter;
