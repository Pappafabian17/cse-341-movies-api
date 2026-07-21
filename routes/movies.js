const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const {validateId,movieValidationRules} = require('../middleware/validate');
const { isAuthenticated }  = require('../middleware/authenticate');

// // PUBLIC ROUTES
//GET ALL

router.get('/', moviesController.getAll);
// 2. GET SINGLE MOVIE BY ID

router.get('/:id', validateId, moviesController.getSingle);
// // PRIVATE ROUTES 

// 3. CREATE
router.post('/', isAuthenticated, movieValidationRules, moviesController.createMovie);
// 4. UPDATE

router.put('/:id', isAuthenticated, validateId, movieValidationRules, moviesController.updateMovie);
// 5. DELETE

router.delete('/:id', isAuthenticated, validateId, moviesController.deleteMovie);

module.exports = router;