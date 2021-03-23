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
    1: {type: Boolean, default: false},
    2: {type: Boolean, default: false},
    3: {type: Boolean, default: false},
    4: {type: Boolean, default: false},
    5: {type: Boolean, default: false},
    6: {type: Boolean, default: false},
    7: {type: Boolean, default: false}
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
  timer: {
    type: Number,
    default: 0
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
      type: Number,
      default: 0
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

module.exports = mongoose.model('Card', cardSchema)