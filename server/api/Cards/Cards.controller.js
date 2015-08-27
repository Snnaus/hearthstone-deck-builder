'use strict';

var _ = require('lodash');
var Cards = require('./Cards.model');

// Get list of Cardss
exports.index = function(req, res) {
  Cards.find(function (err, Cardss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(Cardss);
  });
};

// Get a single Cards
exports.show = function(req, res) {
  Cards.findById(req.params.id, function (err, Cards) {
    if(err) { return handleError(res, err); }
    if(!Cards) { return res.status(404).send('Not Found'); }
    return res.json(Cards);
  });
};

// Creates a new Cards in the DB.
exports.create = function(req, res) {
  Cards.create(req.body, function(err, Cards) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(Cards);
  });
};

// Updates an existing Cards in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Cards.findById(req.params.id, function (err, Cards) {
    if (err) { return handleError(res, err); }
    if(!Cards) { return res.status(404).send('Not Found'); }
    var updated = _.merge(Cards, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(Cards);
    });
  });
};

// Deletes a Cards from the DB.
exports.destroy = function(req, res) {
  Cards.findById(req.params.id, function (err, Cards) {
    if(err) { return handleError(res, err); }
    if(!Cards) { return res.status(404).send('Not Found'); }
    Cards.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}