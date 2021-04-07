module.exports = (io) => {
  const {
    playerJoin,
    playerUpdate,
    getCurrentPlayer,
    playerLeave,
    getRoomUsers,
    getPlayers,
    ready
  } = require('./lobby');
  const {
    createGame,
    addTurn,
    nextTurn
  } = require('./game');

  io.on('connection', socket => {
    console.log('Socket connected.')

    //------LOBBY---------

    // Listen for player join
    socket.on('joinRoom', ({ username, room }) => {
      const player = playerJoin(socket.id, username, room);
      socket.join(player.room);

      socket.broadcast
        .to(player.room)
        .emit('message', `${player.username} has joined the chat.`);

      io.to(player.room).emit('roomUsers', {
        room: player.room,
        players: getRoomUsers(player.room)
      })

      socket.to(player.room).emit('newPlayerJoined')
      
    });

    // Listen for changes in lobby
    socket.on('lobby', playing => {
      playerUpdate(socket.id, playing);
      const player = getCurrentPlayer(socket.id);
      io.to(player.room).emit('roomUsers', {
        room: player.room,
        players: getRoomUsers(player.room)
      });
    });

    // Listen for changes in stage selection
    socket.on('stageSelect', stage => {
      const player = getCurrentPlayer(socket.id);
      io.to(player.room).emit('stageSelect', stage);
      io.to(player.room).emit('roomUsers', {
        room: player.room,
        stage: stage,
        players: getRoomUsers(player.room)
      })
    });

    // Listen for when players are ready
    socket.on('ready', ({ playing, character, stage }) => {
      const player = playerUpdate(socket.id, playing, character);

      const {startGame, playersNotReady} = ready(socket.id, player.room);
      const players = getRoomUsers(player.room);

      const playersPlaying = players.find(player => player.playing == true);

      const player1 = playersPlaying[0];
      const player2 = playersPlaying[1];

      if (startGame) {
        socket.emit('createGame', {
          room: player.room,
          players: {
            p1: player1,
            p2: player2
          },
          data: {},
          stage: stage
        });
      }

      io.to(player.room).emit('ready', {
        startGame: startGame,
        playersNotReady: playersNotReady
      });
    });

    socket.on('startGame', () => {
      player = getCurrentPlayer(socket.id);
      createGame(player.room)
      io.to(player.room).emit('startGame');
    });


    //------GAME---------

    socket.on('loadGame', (name) => {
      //player = getCurrentPlayer(socket.id); dev-change
      player = getCurrentPlayer(name);
      console.log(name)
      socket.emit('loadGame');
    })

    socket.on('turnReady', (data) => {
      const action = data.action;
      const id = data.id;
      const playerState = data.playerState;

      //player = getCurrentPlayer(socket.id); dev-change
      const player = getCurrentPlayer(id)
      const game = addTurn(player.room, player.key, action, playerState);
      console.log(game.data[game.data.length-1])
      if (!!(game.data[game.data.length-1].p1) && !!(game.data[game.data.length-1].p2)) {
        //io.to(player.room).emit('turn', game); dev-change
        io.emit('turn', game)
        nextTurn(player.room);
      }
    })



    // Runs when client disconnects
    socket.on('disconnect', () => {
      const player = playerLeave(socket.id);

      if (player) {
        io.to(player.room).emit('message', `${player.username} has left the chat`);

        // Send users and room info
        io.to(player.room).emit('roomUsers', {
          room: player.room,
          players: getRoomUsers(player.room)
        });
      }
    })
  });
}
