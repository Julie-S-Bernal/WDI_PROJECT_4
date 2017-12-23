const Travel = require("../models/travel");

function travelsIndex(req, res, next) {
  Travel.find()
    .exec()
    .then(travels => res.json(travels))
    .catch(next);
}

function travelsCreate(req, res, next) {
  // if(req.file) req.body.image = req.file.filename;
  req.body.createdBy = req.currentUser;

  Travel.create(req.body)
    .then(travel => res.status(201).json(travel))
    .catch(next);
}

function travelsShow(req, res, next) {
  Travel.findById(req.params.id)
    .exec()
    .then(travel => {
      if (!travel) return res.notFound();
      res.json(travel);
    })
    .catch(next);
}

function travelsUpdate(req, res, next) {
  if (req.file) req.body.image = req.file.filename;

  Travel.findById(req.params.id)
    .exec()
    .then(travel => {
      if (!travel) return res.notFound();

      travel = Object.assign(travel, req.body);
      return travel.save();
    })
    .then(travel => res.json(travel))
    .catch(next);
}

function travelsDelete(req, res, next) {
  Travel.findById(req.params.id)
    .exec()
    .then(travel => {
      if (!travel) return res.notFound();
      return travel.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: travelsIndex,
  create: travelsCreate,
  show: travelsShow,
  update: travelsUpdate,
  delete: travelsDelete
};
