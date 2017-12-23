const User = require("../models/user");

function usersShow(req, res, next) {
  User.findById(req.params.id)
    .populate("travels")
    .exec()
    .then(user => {
      if (!user) return res.notFound();
      res.json(user);
    })
    .catch(next);
}

// function userByToken(req, res, next) {
//   const token = req.header.Authorization;
//   User.findOne({ 'currentToken': token })
//     .exec()
//     .then(users => res.json(users))
//     .catch(next);
// }

module.exports = {
  show: usersShow
};
