import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LittleNest API',
      version: '1.0.0',
      description: 'Enterprise Baby & Kids Ecommerce Platform API',
      contact: { name: 'LittleNest Dev Team', email: 'dev@littlenest.in' },
    },
    servers: [
      { url: '/api/v1', description: 'Development' },
      { url: 'https://api.littlenest.in/api/v1', description: 'Production' },
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
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/**/*.ts', './src/controllers/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
