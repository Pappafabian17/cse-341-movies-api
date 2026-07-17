const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Movie and Director API!');
});

router.use('/', require('./swagger'));
router.use('/movies', require('./movies'));
router.use('/directors', require('./directors'));

module.exports = router;
