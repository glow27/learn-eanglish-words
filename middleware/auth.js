function userLogged(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth');
}

function userLoggedOut(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

module.exports = { userLogged, userLoggedOut };
