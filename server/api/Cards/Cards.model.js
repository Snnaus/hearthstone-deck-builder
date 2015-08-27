'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CardsSchema = new Schema({
  cards: Object
});

module.exports = mongoose.model('Cards', CardsSchema);