import 'module-alias/register';
import app from './config/app';
import './ioc/load';
import environment from './config/environment';

try {
  app.listen(environment.PORT, () =>
    console.info(
      `Server running at http://localhost:${environment.PORT}, proccess ID: ${process.pid}`,
    ),
  );
} catch (error) {
  if (environment.ENVIRONMENT !== 'production') {
    console.error(error);
  }
}
