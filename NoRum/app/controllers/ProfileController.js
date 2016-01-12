'use strict';

var PATH_PREFIX = 'profile';

module.exports = {
  getProfileInfo: function (req, res, next) {
    res.render(PATH_PREFIX + '/profile-info', {loggedUser: req.user})
  }
};
