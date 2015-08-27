/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Cards = require('./Cards.model');

exports.register = function(socket) {
  Cards.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Cards.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('Cards:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('Cards:remove', doc);
}