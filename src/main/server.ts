import postgresDataSource from '../infra/database/datasource';
import app from './config/app';
import environment from './config/environment';

try {
  await postgresDataSource.initialize();

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
