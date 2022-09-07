import express, { Express, Request, Response } from "express";
import db from './models/config';
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const isDev = process.env.NODE_ENV === "development";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express and TypescriptServer");
});

(async () => {
  await db
    .sync({ alter: isDev })
    .then(() => console.log("Connected to database..."))
    .catch((error: unknown) => console.log(error));
  app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
  });
})();