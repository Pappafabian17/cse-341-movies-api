const handleAsync = (funct) => (req, res, next) => {
  Promise.resolve(funct(req,res,next)).catch(next);
};

module.exports = {
  handleAsync
};