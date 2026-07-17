const {body, param, validationResult} = require('express-validator');

const {objectId} = require('mongodb');


const validateResults = (req, res, next) => {
  const error = validateResults(req);
  if(!error.isEmpty()){
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  };
  next();
}

const validateId = [
  param('id').custom((value)=>{
    if(!objectId.isValid(value)){
      throw new Error('Invalid ObjectId format');
    };
    return true;
  }),
  validateResults
];

const movieValidationRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),
  body('director')
    .trim()
    .notEmpty()
    .withMessage('Director is required')
    .isString()
    .withMessage('Director must be a string'),
  body('releaseYear')
    .notEmpty()
    .withMessage('Release year is required')
    .isInt({ min: 1880, max: new Date().getFullYear() + 10 })
    .withMessage('Release year must be a valid year'),
  body('genre')
    .trim()
    .notEmpty()
    .withMessage('Genre is required')
    .isString()
    .withMessage('Genre must be a string'),
  body('rating')
    .trim()
    .notEmpty()
    .withMessage('Rating is required')
    .isString()
    .withMessage('Rating must be a string'),
  body('duration')
    .notEmpty()
    .withMessage('Duration is required')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer representing minutes'),
  body('language')
    .trim()
    .notEmpty()
    .withMessage('Language is required')
    .isString()
    .withMessage('Language must be a string'),
  body('plot')
    .trim()
    .notEmpty()
    .withMessage('Plot is required')
    .isString()
    .withMessage('Plot must be a string'),
  validateResults
];

const directorValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),
  body('birthYear')
    .notEmpty()
    .withMessage('Birth year is required')
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage('Birth year must be a valid year'),
  body('nationality')
    .trim()
    .notEmpty()
    .withMessage('Nationality is required')
    .isString()
    .withMessage('Nationality must be a string'),
  body('notableWorks')
    .isArray({ min: 1 })
    .withMessage('Notable works must be an array of strings containing at least one work')
    .custom((array) => {
      if (!array.every(item => typeof item === 'string' && item.trim() !== '')) {
        throw new Error('All notable works must be non-empty strings');
      }
      return true;
    }),
  body('active')
    .isBoolean()
    .withMessage('Active status must be a boolean (true or false)'),
  validateResults
];

module.exports = {
  validateId,
  movieValidationRules,
  directorValidationRules
}