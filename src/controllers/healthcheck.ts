import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const healthCheckHandler = (_req: Request, response: Response) => {
  return response
    .status(StatusCodes.OK)
    .json({ message: 'System is up and running ✅' });
};

export default healthCheckHandler;
