const games = [{
  room: 'default_room',
  players: {
    "p1": {
      "socket_id": "6063df72c2c6713f68c32611",
      "username": "jim",
      "room": "default_room",
      "character": "605b11ddd37af9220cc6b41b"
    },
    "p2": {
      "socket_id": "6063df72c2c6713f68c32612",
      "username": "seojin",
      "room": "default_room",
      "character": "605b11ddd37af9220cc6b41b"
    }
  },
  data: [{
    p1: {
      playerState: {
        username: '',
        pos: null,
        vert: 0,
        cards: [],
        cooldowns: [],
        health: 15,
        burst: true,
        supercharge: 0,
        state: {
          hitstun: false,
          bind: false
        }
      },
      action: {}
    },
    p2: {
      playerState: {
        username: '',
        pos: null,
        vert: 0,
        cards: [],
        cooldowns: [],
        health: 15,
        burst: true,
        supercharge: 0,
        state: {
          hitstun: false,
          bind: false
        }
      },
      action: {}
    }
  }],
  stage: ''
}];

function createGame (roomName) {
  const room = {
    room: roomName
  };
}

function addTurn (roomName, key, action, playerState) {
  const player = key == 'p1' ? 'p1' : 'p2';
  const index = games.findIndex(game => game.room === roomName);
  games[index].data[games[index].data.length-1][player] = {
    playerState: playerState,
    action: action
  };
  return games[index];
}

function nextTurn (roomName) {
  const index = games.findIndex(game => game.room === roomName);
  games[index].data.push({
    p1: {
      playerState: {
        username: '',
        pos: null,
        vert: 0,
        cards: [],
        cooldown: [],
        health: 15,
        burst: true,
        supercharge: 0,
        state: {
          hitstun: false,
          bind: false
        }
      },
      action: {}
    },
    p2: {
      playerState: {
        username: '',
        pos: null,
        vert: 0,
        cards: [],
        cooldown: [],
        health: 15,
        burst: true,
        supercharge: 0,
        state: {
          hitstun: false,
          bind: false
        }
      },
      action: {}
    }
  });
}

function updatePlayerState (roomName, playerState) {
  const index = games.findIndex(game => game.room === roomName);
  games[index].data[games[index].data.length-1].p1.playerState = playerState.p1;
  games[index].data[games[index].data.length-1].p2.playerState = playerState.p2;
  return games[index];
}

module.exports = {
  createGame,
  addTurn,
  nextTurn,
  updatePlayerState
};