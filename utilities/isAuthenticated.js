const isAuthenticated = (req, res, next) => {
  if (req.user) return next();

  res.status(401).send();
};

module.exports = isAuthenticated;
