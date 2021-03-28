const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new mongoose.Schema({
  room: {
    type: String,
    unique: true,
    default: "default_room"
  },
  players: [Schema.Types.Mixed],
  stage: {type: Schema.Types.ObjectId, ref: 'Stage'}
});

module.exports = mongoose.model('Room', roomSchema)