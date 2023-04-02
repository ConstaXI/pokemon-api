import environment from './config/environment';
import app from './config/app';

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
