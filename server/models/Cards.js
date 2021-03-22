const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  card_type: {
    type: String,
    required: true
  },
  photo: String,
  movement: {
    lateral: Number,
    vertical: Number,
  },
  hit: {
    1: Boolean,
    2: Boolean,
    3: Boolean,
    4: Boolean,
    5: Boolean,
    6: Boolean,
    7: Boolean,
  },
  prio: {
    type: Number,
    required: true
  },
  cooldown: {
    type: Number,
    required: true
  },
  crush: {
    type: Boolean,
    default: false
  },
  active: {
    damage: Number,
    displace: {
      lateral: Number,
      vertical: Number
    },
    hitstun: {
      type: Boolean,
      default: false
    }
  },
  passive: {
    unblockable: {
      type: Boolean,
      default: false
    },
    supercharge: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
  },
  target: {
    high: {
      type: Boolean,
      default: false
    },
    mid: {
      type: Boolean,
      default: false
    },
    low: {
      type: Boolean,
      default: false
    },
  },
  version: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Cards', cardSchema)