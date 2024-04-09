import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'O\'Survivors API Documentation',
    description: 'Documentation de l\'API de gestion de O\'Survivors.',
  },
  host: 'localhost:3001',
  basePath: '/v1/api',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Account',
      description: 'API pour la gestion des comptes.',
    },
    {
      name: 'Character',
      description: 'API pour la gestion des personnages.',
    },
    {
      name: 'Contact',
      description: 'API pour la gestion des contacts.',
    },
    {
      name: 'Enemy',
      description: 'API pour la gestion des ennemis.',
    },
    {
      name: 'Stage',
      description: 'API pour la gestion des niveaux.',
    },
    {
      name: 'User',
      description: 'API pour la gestion des utilisateurs.',
    },
    {
      name: 'Weapon',
      description: 'API pour la gestion des armes.',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      scheme: 'bearer',
      description: 'JWT Authorization header using the Bearer scheme',
    },
  },
  definitions: {
    Account: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string' },
      },
    },
    Character: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        health: { type: 'number' },
        attack: { type: 'number' },
        defense: { type: 'number' },
        speed: { type: 'number' },
        weapon: { type: 'string' },
        userId: { type: 'string' },
      },
    },
    Contact: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        message: { type: 'string' },
      },
    },
    Enemy: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        health: { type: 'number' },
        attack: { type: 'number' },
        defense: { type: 'number' },
        speed: { type: 'number' },
        stageId: { type: 'string' },
      },
    },
    Stage: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        level: { type: 'number' },
        background: { type: 'string' },
      },
    },
    User: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string' },
      },
    },
    Adduser: {
      $username: 'JohnDoe',
      $email: 'john.doe@mail.com',
      $password: 'password',
    },
    Weapon: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        attack: { type: 'number' },
        speed: { type: 'number' },
        userId: { type: 'string' },
      },
    },
  },

};

const outputFile = './swagger-output.json';
const routes = ['./app/routers/index.router.js'];

swaggerAutogen()(outputFile, routes, doc);
