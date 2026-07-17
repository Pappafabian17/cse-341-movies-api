const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId
const {handleAsync} = require('../utils/errorHandler')


const getAll = handleAsync(async (req, res) => {
  //#swagger.tags = ['Directors']
  const result = await mongodb.getDatabase().db().collection("directors").find();
  const directors = await result.toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(directors);
});

const getSingle = handleAsync(async (req, res) => {
  //#swagger.tags = ['Directors']
  const directorId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection("directors").find({ _id: directorId });
  const directors = await result.toArray();
  
  if (directors.length === 0) {
    const err = new Error("Director not found");
    err.statusCode = 404;
    throw err;
  }
  
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(directors[0]);
});

const createDirector = handleAsync(async (req, res) => {
  //#swagger.tags = ['Directors']
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add a new director to the database',
        required: true,
        schema: { $ref: '#/definitions/Director' }
  } */
  const director = {
    name: req.body.name,
    birthYear: parseInt(req.body.birthYear),
    nationality: req.body.nationality,
    notableWorks: req.body.notableWorks,
    active: req.body.active === true || req.body.active === 'true'
  };
  
  const response = await mongodb.getDatabase().db().collection("directors").insertOne(director);
  if (response.acknowledged) {
    res.status(201).json({ success: true, id: response.insertedId });
  } else {
    throw new Error("Some error occurred while creating the director.");
  }
});

const updateDirector = handleAsync(async (req, res) => {
  //#swagger.tags = ['Directors']
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update director information',
        required: true,
        schema: { $ref: '#/definitions/Director' }
  } */
  const directorId = new ObjectId(req.params.id);
  const director = {
    name: req.body.name,
    birthYear: parseInt(req.body.birthYear),
    nationality: req.body.nationality,
    notableWorks: req.body.notableWorks,
    active: req.body.active === true || req.body.active === 'true'
  };
  
  const response = await mongodb.getDatabase().db().collection("directors").replaceOne({ _id: directorId }, director);
  if (response.modifiedCount > 0 || response.matchedCount > 0) {
    res.status(204).send();
  } else {
    const err = new Error("Director not found or no changes made.");
    err.statusCode = 404;
    throw err;
  }
});

const deleteDirector = handleAsync(async (req, res) => {
  //#swagger.tags = ['Directors']
  const directorId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection("directors").deleteOne({ _id: directorId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    const err = new Error("Director not found.");
    err.statusCode = 404;
    throw err;
  }
});
module.exports = {
  getAll,
  getSingle,
  createDirector,
  updateDirector,
  deleteDirector
};