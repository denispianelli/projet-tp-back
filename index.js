import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import debug from 'debug';
import router from './app/routers/index.router.js';
import handleError from './app/services/error-handler.service.js';

const app = express();

const logger = debug('app:server');

const corsOptions = {
  origin: process.env.ORIGIN_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/v1/api', router);

app.use(handleError);

const { PORT } = process.env;
const { BASE_URL } = process.env;

app.listen(PORT, () => {
  logger(`${BASE_URL}${PORT}`);
});
