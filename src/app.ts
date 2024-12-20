import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// Perser
app.use(express.json());
app.use(cors());

// TODO:
/**
 *
 */

// application routes
app.use('/app/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my first express server!');
});

// Middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
