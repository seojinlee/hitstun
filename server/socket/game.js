const games = [{
  room: 'default_room',
  players: {
    p1: {},
    p2: {}
  },
  data: [{
  }],
  stage: ''
}];

function createGame (roomName) {
  const room = {
    room: roomName
  };
  games.push(room);
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
  games[index].data.push({});
}

module.exports = {
  createGame,
  addTurn,
  nextTurn
};