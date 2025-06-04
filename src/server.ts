import 'tsconfig-paths/register';
import app from './app';
import env from './config/env';
import logger from './utils/logger';

app.listen(env.PORT ?? process.env.PORT, () => {
  logger.info('Server started at http://localhost:%s', env.PORT);
});
