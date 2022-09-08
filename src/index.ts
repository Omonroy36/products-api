import express, { Express, Request, Response } from 'express';
import productRoute from './routes/product';
import db from './config/sequelize';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

export const app: Express = express();
const port = process.env.PORT || '5000';
const isDev = process.env.NODE_ENV === 'development';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api/store', productRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Express and TypescriptServer');
});

(async () => {
  await db
    .sync({ alter: isDev })
    .then(() => console.log('Connected to database...'))
    .catch((error: unknown) => console.log(error));
  app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
  });
})();
