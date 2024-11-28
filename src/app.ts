import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/students/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// Perser
app.use(express.json());
app.use(cors());

// application routes
app.use('/app/v1/students', StudentRoutes);
app.use('/app/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my first express server!');
});

app.use(globalErrorHandler);
app.use(notFound)
export default app;
