import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

/**  PRACTICE TASK
 * 1 [DONE] Create a find route for all academic semesters. / [GET]
 * 2 [DONE] Create a find route for single academic semesters route using _id. /:_id [GET]
 * 3 Create an update route for updating a single academic semesters route using _id. /:_id [PATCH]
 * */

// Perser
app.use(express.json());
app.use(cors());

// application routes
app.use('/app/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my first express server!');
});

// Middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
