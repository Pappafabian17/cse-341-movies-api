const isAuthenticated = (req, res , next) => {
  if(req.session.user === undefined){
    return res.status(401).json({
      success: false,
      message: "You do not have access. please log in first. "
    })
  }
  next();
}

module.exports = {isAuthenticated}