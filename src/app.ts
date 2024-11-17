import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/students/student.route';

const app: Application = express();

// Perser
app.use(express.json());
app.use(cors());

// application routes
app.use('/app/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my first express server!');
});

export default app;
