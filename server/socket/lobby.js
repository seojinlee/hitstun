const players = [];
const colors = [
    "is-success",
    "is-danger",
    "is-warning",
    "is-info",
    "is-dark",
  ]

// Join player to chat
function playerJoin(id, username, room) {
  var player;
  const index = players.findIndex(player => player.id === id);

  if (index <0) {
    player = { id, username, room };
    player.playing = false;
    player.character = '';
    player.ready = false;
    player.color = colors[0];

    colors.push(colors.splice(0, 1)[0]);
    players.push(player);
  }
  else {
    player = players[index];
  }

  return player;
}

function playerUpdate(id, playing, character) {
  const currentPlayer = getCurrentPlayer(id);

  currentPlayer.playing = playing;
  currentPlayer.character = character;

  return currentPlayer;
}

// Get current player
function getCurrentPlayer(id) {
  return players.find(player => player.id === id);
}

// Player leaves chat
function playerLeave(id) {
  const index = players.findIndex(player => player.id === id);

  if (index !== -1) {
    return players.splice(index, 1)[0];
  }
}

// Get room players
function getRoomUsers(room) {
  return players.filter(player => player.room === room);
}

// Get all players
function getPlayers() {
  return players;
}

function ready(id, room) {
  const currentPlayer = getCurrentPlayer(id);
  currentPlayer.ready = true;

  roomPlayers = getRoomUsers(room);
  
  var startGame = false;
  const playersNotReady = [];

  roomPlayers.forEach(player => {
    if (!player.ready) {
      playersNotReady.push(player);
      currentPlayer.ready = true;
    }
  });

  if (playersNotReady.length < 1) {
    startGame = true;
    return {startGame, playersNotReady}
  }
  else {
    return {startGame, playersNotReady}
  }
}

module.exports = {
  playerJoin,
  playerUpdate,
  getCurrentPlayer,
  playerLeave,
  getRoomUsers,
  getPlayers,
  ready
};