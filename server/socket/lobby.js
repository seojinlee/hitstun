//const players = [];

players = [
  {
    id: "6063df72c2c6713f68c32611",
    username: 'jim',
    room: 'default_room',
    playing: true,
    character: "605b1170d37af9220cc6b418",
    num: 0
  },
  {
    id: "6063df72c2c6713f68c32612",
    username: 'seojin',
    room: 'default_room',
    playing: true,
    character: "605b1170d37af9220cc6b418",
    num: 1
  }
]
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
    player.num = null;
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
  //return players.find(player => player.id === id); //dev-change
  return players.find(player => player.username === id)
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

  if (currentPlayer.playing) 

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

    var startPosFlag = 0;
    roomPlayers.forEach(player => {
      if (player.playing) {
        const playerUpdate = players.find(playerUpdate => playerUpdate.id === player.id)
        playerUpdate.num = startPosFlag;
        startPosFlag++
      }
    });

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