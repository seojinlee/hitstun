const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new mongoose.Schema({
  room: {
    type: String,
    unique: true,
    default: "default_room"
  },
  players: [{
    id: String,
    username: String,
    room: String,
    playing: Boolean,
    character: {type: Schema.Types.ObjectId, ref: 'Character'},
    num: Number,
    ready: String,
    color: String
  }],
  turn: [{
    player1: {
      card: {type: Schema.Types.ObjectId, ref: 'Card'},
      supermove: Number
    },
    player2: {
      card: {type: Schema.Types.ObjectId, ref: 'Card'},
      supermove: Number
    }
  }],
  stage: {type: Schema.Types.ObjectId, ref: 'Stage'}
});

module.exports = mongoose.model('Room', roomSchema)