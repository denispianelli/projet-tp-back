import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import debug from 'debug';
import { createRequire } from 'node:module';
import swaggerUi from 'swagger-ui-express';
import router from './app/routers/index.router.js';
import notFound from './app/services/not-found.service.js';
import handleError from './app/services/error-handler.service.js';
import sanitizeData from './app/middlewares/sanitize.middleware.js';

const require = createRequire(import.meta.url);
const swaggerFile = require('./swagger-output.json');

const app = express();

const logger = debug('app:server');

/**
 * Options de configuration pour CORS.
 * @typedef {Object} CorsOptions
 * @property {string} origin - L'URL d'origine autorisée pour les requêtes CORS.
 * @property {number} optionsSuccessStatus - Le code de statut HTTP à renvoyer
 * pour les requêtes OPTIONS.
 */
const corsOptions = {
  origin: process.env.ORIGIN_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(sanitizeData);

app.use('/v1/api', router);
app.use('/v1/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(notFound);
app.use(handleError);

const { PORT } = process.env;
const { BASE_URL } = process.env;

app.listen(PORT, () => {
  logger(`${BASE_URL}${PORT}`);
});
