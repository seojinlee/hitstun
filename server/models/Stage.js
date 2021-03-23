const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  photo: {
    type: String,
    unique: true
  },
  stage_effect_name: {
    type: String,
    unique: true
  },
  size: Number,
  neutral_pos: Number,
  version: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Stage', stageSchema)