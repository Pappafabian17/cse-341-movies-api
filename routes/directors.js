const express = require('express');
const router = express.Router();
const directorsController = require('../controllers/directors');
const { validateId, directorValidationRules } = require('../middleware/validate');

// 1. GET ALL DIRECTORS
router.get('/', directorsController.getAll);

// 2. GET SINGLE DIRECTOR BY ID
router.get('/:id', validateId, directorsController.getSingle);

// 3. CREATE A NEW DIRECTOR
router.post('/', directorValidationRules, directorsController.createDirector);

// 4. UPDATE AN EXISTING DIRECTOR
router.put('/:id', validateId, directorValidationRules, directorsController.updateDirector);

// 5. DELETE A DIRECTOR
router.delete('/:id', validateId, directorsController.deleteDirector);

module.exports = router;
