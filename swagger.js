const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movies and Directors API',
    description: 'An API designed to perform CRUD operations on movies and directors database.',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';

const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

