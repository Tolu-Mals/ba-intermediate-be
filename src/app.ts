import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import logger from '@/utils/logger';
import env from './config/env';

const app = express();

// In production, use combined format and pipe through Winston
if (env.NODE_ENV === 'production') {
  app.use(
    morgan('combined', {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    }),
  );
} else {
  // Use Morgan in development mode with colorful output
  app.use(morgan('dev'));
}

//secure server by setting recommended headers
app.use(helmet());

//set cors
app.use(cors());

//remove default express header
app.disable('x-powered-by');

export { app };
