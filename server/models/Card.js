const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: String,
  card_type: {
    attack: {
      type: Boolean,
      required: true,
      default: false
    },
    move: {
      type: Boolean,
      required: true,
      default: false
    },
    block: {
      type: Boolean,
      required: true,
      default: false
    },
    super: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  assoc: {
    type: String,
    required: true
  },
  photo: String,
  cooldown: {
    type: Number,
    required: true
  },
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
    7: {type: Boolean, default: false},
    8: {type: Boolean, default: false},
    9: {type: Boolean, default: false}
  },
  prio: {
    type: Number,
    required: true
  },
  supercharge_cost: {
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
    },
    bind: {
      type: Boolean,
      default: false
    },
    reposition: {
      type: Boolean,
      default: false
    },
    supercharge: {
      type: Number,
      default: 0
    }
  },
  passive: {
    unblockable: {
      type: Boolean,
      default: false
    },
    tenacity: {
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