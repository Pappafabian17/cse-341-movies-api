const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const {validateId,movieValidationRules} = require('../middleware/validate');
//GET ALL

router.get('/', moviesController.getAll);
// 2. GET SINGLE MOVIE BY ID

router.get('/:id', validateId, moviesController.getSingle);
// 3. CREATE
router.post('/', movieValidationRules, moviesController.createMovie);
// 4. UPDATE

router.put('/:id', validateId, movieValidationRules, moviesController.updateMovie);
// 5. DELETE

router.delete('/:id', validateId, moviesController.deleteMovie);

module.exports = router;