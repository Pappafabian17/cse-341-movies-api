const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movies and Directors API',
    description: 'An API designed to perform CRUD operations on movies and directors database.',
  },
  definitions: {
    Movie: {
      title: 'Inception',
      director: 'Christopher Nolan',
      releaseYear: 2010,
      genre: 'Sci-Fi',
      rating: 'PG-13',
      duration: 148,
      language: 'English',
      plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'
    },
    Director: {
      name: 'Christopher Nolan',
      birthYear: 1970,
      nationality: 'British-American',
      notableWorks: ['Inception', 'Interstellar', 'The Dark Knight'],
      active: true
    }
  }
};

const outputFile = './swagger.json';

const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

