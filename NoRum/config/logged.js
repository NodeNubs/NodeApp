
module.exports = function(app) {
  app.use(function (req, res, next) {
    req.authService = {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      isAdmin: req.user && req.user.roles.indexOf('admin') !== -1
    };

    next();
  });
};
