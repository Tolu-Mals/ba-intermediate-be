import ROUTES from '@/constants/routes';
import { Router } from 'express';
import healthCheckRouter from './healthcheck';

const v1Router = Router();

v1Router.use(ROUTES.healthcheck, healthCheckRouter);

export default v1Router;
