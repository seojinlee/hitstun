const games = [{
  room: 'default_room',
  turns: [[]]
}];

function createGame (roomName) {
  const room = {
    room: roomName,
    turns: [[]]
  };
  games.push(room);
}

function addTurn (roomName, action, playerNum) {
  const index = games.findIndex(game => game.room === roomName);
  games[index].turns[games[index].turns.length-1].push ({
    player: playerNum,
    action: action
  });
  return games[index];
}

function nextTurn (roomName) {
  const index = games.findIndex(game => game.room === roomName);
  if (games[index].turns[games[index].turns.length-1].length > 1) {
    games[index].turns.push([]);
  }
}

module.exports = {
  createGame,
  addTurn,
  nextTurn
};