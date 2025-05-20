import 'tsconfig-paths/register';
import app from './app';
import env from './config/env';
import logger from './utils/logger';

app.listen(3000, () => {
  logger.info('Server started on Port %s', env.PORT);
});
