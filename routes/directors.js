const express = require('express');
const router = express.Router();
const directorsController = require('../controllers/directors');
const { validateId, directorValidationRules } = require('../middleware/validate');
const { isAuthenticated }  = require('../middleware/authenticate');

// // PUBLIC ROUTES
// 1. GET ALL DIRECTORS
router.get('/', directorsController.getAll);

// 2. GET SINGLE DIRECTOR BY ID
router.get('/:id', validateId, directorsController.getSingle);

// // PRIVATE ROUTES 
// 3. CREATE A NEW DIRECTOR
router.post('/', isAuthenticated, directorValidationRules, directorsController.createDirector);

// 4. UPDATE AN EXISTING DIRECTOR
router.put('/:id', isAuthenticated, validateId, directorValidationRules, directorsController.updateDirector);

// 5. DELETE A DIRECTOR
router.delete('/:id', isAuthenticated, validateId, directorsController.deleteDirector);

module.exports = router;
