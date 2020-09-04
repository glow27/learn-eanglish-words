module.exports = function setLocals(req, res, next) {
  if (req.session && req.user) {
    res.locals.name = req.user.firstName;
  }
  next();
};
