const router = require("express").Router();
const passport = require('passport');

router.get('/login', passport.authenticate('github', {scope: ['user:email']}));
router.get('/logout', function(req, res, next){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    req.session.destroy( function(){
      res.clearCookie('connect.sid');
      res.redirect('/')
    })
  })
})

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false
  }),
  (req, res) => {
    // Guardamos los datos del usuario autenticado en la sesión de Express
    req.session.user = req.user;
    res.redirect('/');
  }
);

module.exports = router;