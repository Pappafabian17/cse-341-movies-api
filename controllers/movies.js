const mongodb = require('../data/database')
const ObjectId = require("mongodb").ObjectId;
const {handleAsync} = require("../utils/errorHandler");

const getAll = handleAsync(async (req, res) =>{
   //#swagger.tags = ['Movies']
  const result = await mongodb.getDatabase().db().collection("movies").find();
  const movies = await result.toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(movies);
})

const getSingle = handleAsync(async (req, res) => {
  //#swagger.tags = ['Movies']
  const movieId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection("movies").find({ _id: movieId });
  const movies = await result.toArray();
  
  if (movies.length === 0) {
    const err = new Error("Movie not found");
    err.statusCode = 404;
    throw err;
  }
  
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(movies[0]);
});

const createMovie = handleAsync(async (req, res) => {
  //#swagger.tags = ['Movies']
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add a new movie to the database',
        required: true,
        schema: { $ref: '#/definitions/Movie' }
  } */
  const movie = {
    title: req.body.title,
    director: req.body.director,
    releaseYear: parseInt(req.body.releaseYear),
    genre: req.body.genre,
    rating: req.body.rating,
    duration: parseInt(req.body.duration),
    language: req.body.language,
    plot: req.body.plot
  };
  
  const response = await mongodb.getDatabase().db().collection("movies").insertOne(movie);
  if (response.acknowledged) {
    res.status(201).json({ success: true, id: response.insertedId });
  } else {
    throw new Error("Some error occurred while creating the movie.");
  }
});

const updateMovie = handleAsync(async (req, res) => {
  //#swagger.tags = ['Movies']
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update movie information',
        required: true,
        schema: { $ref: '#/definitions/Movie' }
  } */
  const movieId = new ObjectId(req.params.id);
  const movie = {
    title: req.body.title,
    director: req.body.director,
    releaseYear: parseInt(req.body.releaseYear),
    genre: req.body.genre,
    rating: req.body.rating,
    duration: parseInt(req.body.duration),
    language: req.body.language,
    plot: req.body.plot
  };
  
  const response = await mongodb.getDatabase().db().collection("movies").replaceOne({ _id: movieId }, movie);
  if (response.modifiedCount > 0 || response.matchedCount > 0) {
    res.status(204).send();
  } else {
    const err = new Error("Movie not found or no changes made.");
    err.statusCode = 404;
    throw err;
  }
});

const deleteMovie = handleAsync(async (req, res) => {
  //#swagger.tags = ['Movies']
  const movieId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection("movies").deleteOne({ _id: movieId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    const err = new Error("Movie not found.");
    err.statusCode = 404;
    throw err;
  }
});
module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie
};