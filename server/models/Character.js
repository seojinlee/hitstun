const mongoose = require('mongoose')
const Schema = mongoose.Schema

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  photo: String,
  character_card: {
    type: String,
    required: true,
    unique: true
  },
  cards: [{type: Schema.Types.ObjectId, ref: 'Card'}],
  version: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Character', characterSchema)