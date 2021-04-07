const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new mongoose.Schema({
  room: {
    type: String,
    unique: true,
    default: "default_room"
  },
  players: {
    p1: {
      socket_id: String,
      username: String,
      room: String,
      character: {type: Schema.Types.ObjectId, ref: 'Character'},
      num: Number
    },
    p2: {
      socket_id: String,
      username: String,
      room: String,
      character: {type: Schema.Types.ObjectId, ref: 'Character'},
      num: Number
    }
  },
  data: [{
    p1: {
      playerState: {},
      action: {
        card: {},
        supermove: {type: Number, default: 0},
        burst: {type: Boolean, default: false}
      }
    },
    p2: {
      playerState: {},
      action: {
        card: {},
        supermove: {type: Number, default: 0},
        burst: {type: Boolean, default: false}
      }
    }
  }],
  stage: {type: Schema.Types.ObjectId, ref: 'Stage'}
});

module.exports = mongoose.model('Room', roomSchema)