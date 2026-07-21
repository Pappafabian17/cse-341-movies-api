const router = require('express').Router();

router.get('/', (req, res) => {
  //#swagger.tags = ['Hello World']
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName || req.session.user.username}`
      : 'Logged out'
  );
});

router.use('/', require('./swagger'));
router.use('/', require('./auth'));
router.use('/movies', require('./movies'));
router.use('/directors', require('./directors'));

module.exports = router;
