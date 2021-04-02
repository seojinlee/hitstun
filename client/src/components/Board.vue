<template>
  <section class="board">
    <div class="content">

      <div class="container">
        <div class="players-container">
          <div v-bind:id="players[0]._id" class="player1">
            {{players[0].username}}
          </div>

          <div v-bind:id="players[1]._id" class="player2">
            {{players[1].username}}
          </div>
        </div>

        <div class="spaces-container">
          <div class="end"></div>
          <div class="space wall"> W
          </div>
          <div class="space"
            v-for="(space, index) in boardSpaces"
            v-bind:class="space"
            :key=index>
            {{space}}
          </div>
          <div class="space wall"> W
          </div>
          <div class="end"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import GameService from '@/services/GameService'

export default {
  data () {
    return {
      name: '', //dev-change
      room: {},
      stage: {},
      boardSpaces: [],
      players: []
    }
  },
  sockets: {
    turn (game) {
      console.log('turn length: ', game.turns[game.turns.length-1].length)
      if (game.turns[game.turns.length-1].length > 1) {
        console.log(game)
        console.log(this.players)
        // Play cards
        const turn = game.turns[game.turns.length-1]

        // Movement
        const newPos = this.getPos(game.turns[game.turns.length-1])
        this.players[0].pos = newPos[0]
        this.players[0].vert = turn[0].player == 0 ? turn[0].action.card.movement.vertical : turn[1].action.card.movement.vertical
        this.players[1].pos = newPos[1]
        this.players[1].vert = turn[0].player == 1 ? turn[0].action.card.movement.vertical : turn[1].action.card.movement.vertical

        this.move()

        //Attack


        this.$socket.emit('nextTurn', this.name) //dev-change
      }
    }
  },
  methods: {
    onResize () {
      const player1_pos = document.getElementsByClassName('space')[this.players[0].pos].offsetLeft
      const player2_pos = document.getElementsByClassName('space')[this.players[1].pos].offsetLeft

      document.getElementById(this.players[0]._id).style.left = player1_pos+'px'
      document.getElementById(this.players[1]._id).style.left = player2_pos+'px'

      const player1Height = document.getElementById(this.players[0]._id).offsetHeight
      const player2Height = document.getElementById(this.players[0]._id).offsetHeight

      const topSpace = document.getElementsByClassName('space')[0].offsetTop
      const heightSpace = document.getElementsByClassName('space')[0].offsetHeight

      const player1Vert = 1 - (this.players[0].vert +1)*0.5
      const player2Vert = 1 - (this.players[1].vert +1)*0.5

      document.getElementById(this.players[0]._id).style.top = topSpace + heightSpace*player1Vert - player1Height*player1Vert +'px'
      document.getElementById(this.players[1]._id).style.top = topSpace + heightSpace*player2Vert - player2Height*player2Vert +'px'
    },

    moveIncrement (player, pos, move) {
      const p1 = player == 0 ? 0 : 1
      const p2 = player == 0 ? 1 : 0
      var moveDir

      // Get move direction
      if (this.players[p1].pos < this.players[p2].pos) {
        moveDir = 1
      }
      else {
        moveDir = -1
      }
      // Check for wall collision
      if (pos + move*moveDir < 0 || pos + move*moveDir > this.stage.size*2-1) {
        return pos
      }
      else {
        return pos + move*moveDir
      }
    },

    getPos (turn) {
      const new_player_pos = [
        this.players[0].pos,
        this.players[1].pos 
      ]
      const player_move_count = []
      const turn_parsed = []

      for (let i=0; i<2; i++) {
        if (turn[0].player == i) turn_parsed.push(turn[0])
        if (turn[1].player == i) turn_parsed.push(turn[1])
      }

      player_move_count.push(turn_parsed[0].action.card.movement.lateral)
      player_move_count.push(turn_parsed[1].action.card.movement.lateral)

      const max_move = Math.max(Math.abs(turn[0].action.card.movement.lateral), Math.abs(turn[1].action.card.movement.lateral))

      // Incrementally move player until collsion
      for (let i=0; i<max_move; i++) {

        // When are is one space between players, heck for player collision
        if (Math.abs(new_player_pos[0] - new_player_pos[1])-1 < 2) {
          const potentialPos = [
            this.moveIncrement(0, new_player_pos[0], Math.sign(player_move_count[0])),
            this.moveIncrement(1, new_player_pos[1], Math.sign(player_move_count[1]))
          ]
          console.log('potential collision: ', new_player_pos[0],new_player_pos[1])
          // If collision occurs, run collision resolution
          if (potentialPos[0] == potentialPos[1]) {
            console.log('collision')
            // Check if one player is airbourne
            if (turn_parsed[0].action.card.movement.vertical > 0 || turn_parsed[1].action.card.movement.vertical > 0) {
              if (!(turn_parsed[0].action.card.movement.vertical > 0 && turn_parsed[1].action.card.movement.vertical > 0)) {
              console.log('airbourn collision')

                // Two players pass through
                for (let i=0; i<2; i++) {
                  new_player_pos[i] = this.moveIncrement(i, new_player_pos[i], Math.sign(player_move_count[i]))
                }

                // If this is the last increment, airbourne player lands on one space after opponent
                if (Math.abs(player_move_count[0]) + Math.abs(player_move_count[0]) == 0) {
                  for (let i=0; i<2; i++) {
                    if (turn_parsed[i].action.card.movement.vertical > 0) {
                      new_player_pos[i] = this.moveIncrement(i, new_player_pos[i], Math.sign(player_move_count[i]))

                      // If the airbourne player cannot move because of wall collision, move the player back
                      if (new_player_pos[0] == new_player_pos[1]) {
                        new_player_pos[i] = this.moveIncrement(i, new_player_pos[i], -1*Math.sign(player_move_count[i]))
                      }
                    }
                  }
                }

              }
            }
            
            // Collision resolution when neither or both players are airbourne
            else {
              // If there is one space between players
              if (Math.abs(new_player_pos[0] - new_player_pos[1])-1 === 1) {
                console.log('grounded collision - 1 space')
                const boundary = [
                  new_player_pos[0] < new_player_pos[1] ? 0 : this.stage.size*2-1,
                  new_player_pos[0] > new_player_pos[1] ? 0 : this.stage.size*2-1
                ]

                const p1_fromWall = Math.abs(new_player_pos[0] - boundary[0])
                const p2_fromWall = Math.abs(new_player_pos[1] - boundary[1])
                
                // Move player furthest from stage boundary
                if (p1_fromWall > p2_fromWall) {
                  new_player_pos[0] = this.moveIncrement(0, new_player_pos[0], Math.sign(player_move_count[0]))
                }
                else {
                  new_player_pos[1] = this.moveIncrement(1, new_player_pos[1], Math.sign(player_move_count[1]))
                }
              }
              // If there are no spaces between players, do nothing

            }

          }
          // If no collision, move as normal
          else {
            for (let i=0; i<2; i++) {
              new_player_pos[i] = this.moveIncrement(i, new_player_pos[i], Math.sign(player_move_count[i]))
            }
          }

        }
        else {
          for (let i=0; i<2; i++) {
            console.log('no collision')
            new_player_pos[i] = this.moveIncrement(i, new_player_pos[i], Math.sign(player_move_count[i]))
          }
        }
        
        if (Math.abs(player_move_count[0]) > 0) {
          player_move_count[0] -= Math.sign(player_move_count[0])
        }
        if (Math.abs(player_move_count[1]) > 0) {
          player_move_count[1] -= Math.sign(player_move_count[1])
        }
      }

      return new_player_pos

    },
    move () {
      this.players.forEach(player => {
        // Move horizontal
        const moveTo = document.getElementsByClassName('space')[player.pos].offsetLeft
        document.getElementById(player._id).style.left = moveTo+'px'

        // Move vertical
        const player1Height = document.getElementById(this.players[0]._id).offsetHeight
        const player2Height = document.getElementById(this.players[0]._id).offsetHeight

        const topSpace = document.getElementsByClassName('space')[0].offsetTop
        const heightSpace = document.getElementsByClassName('space')[0].offsetHeight

        const player1Vert = 1 - (this.players[0].vert +1)*0.5
        const player2Vert = 1 - (this.players[1].vert +1)*0.5

        document.getElementById(this.players[0]._id).style.top = topSpace + heightSpace*player1Vert - player1Height*player1Vert +'px'
        document.getElementById(this.players[1]._id).style.top = topSpace + heightSpace*player2Vert - player2Height*player2Vert +'px'
      })
    }
  },

  async created () {
    this.name = this.$store.state.user // dev-change
    this.room = (await GameService.getRoom(this.$route.params.room)).data
    this.stage = (await GameService.getStage(this.room.stage)).data

    for (var i=1; i < (this.stage.size*2) - 1; i++) {
      if (i== (this.stage.size - this.stage.neutral_pos) || i == this.stage.size + this.stage.neutral_pos -1) {
        this.boardSpaces.push('N');
      }
      else {
        this.boardSpaces.push('');
      }
    }

    this.players.push(this.room.players.find(player => player.num == 0))
    this.players.push(this.room.players.find(player => player.num == 1))

    this.players[0].pos = this.stage.size - this.stage.neutral_pos
    this.players[1].pos = this.stage.size + this.stage.neutral_pos -1

    this.players[0].vert = 0
    this.players[1].vert = 0

    this.players[0].cards =(await GameService.getCharacter('605b1170d37af9220cc6b418')).data.cards
    this.players[1].cards =(await GameService.getCharacter('605b1170d37af9220cc6b418')).data.cards
  },

  mounted () {
    window.addEventListener('resize', this.onResize)
  },

  updated () {
    const player1Height = document.getElementById(this.players[0]._id).offsetHeight
    const player2Height = document.getElementById(this.players[0]._id).offsetHeight

    const leftNeutral = document.getElementsByClassName('N')[0].offsetLeft
    const rightNeutral = document.getElementsByClassName('N')[1].offsetLeft
    const topNeutral = document.getElementsByClassName('N')[0].offsetTop
    const heightNeutral = document.getElementsByClassName('N')[0].offsetHeight

    const player1Vert = 1 - (this.players[0].vert +1)*0.5
    const player2Vert = 1 - (this.players[1].vert +1)*0.5

    document.getElementById(this.players[0]._id).style.left = leftNeutral+'px'
    document.getElementById(this.players[0]._id).style.top = topNeutral + heightNeutral*player1Vert - player1Height*player1Vert +'px'
    document.getElementById(this.players[1]._id).style.left = rightNeutral+'px'
    document.getElementById(this.players[1]._id).style.top = topNeutral + heightNeutral*player2Vert - player2Height*player2Vert +'px'
  },

  watch: {
  }
}
</script>

<style scoped>
  .container {
    padding: 0;
  }
  .players-container {
    width: 100%;
    height: 100%;
  }
  .player1 {
    position: absolute;
    width: 10%;
    text-align: center;
    left: 277px;
  }
  .player2 {
    position: absolute;
    width: 10%;
    text-align: center;
    left: 277px;
  }
  .spaces-container {
    display: flex;
    justify-content: center;
  }
  .space {
    background-color: red;
    border: 1px solid black;
    width: 10%;
    padding-bottom: 12%;
    font-family: 'Paladins Condensed Condensed';
  }
  .end {
    background-color: grey;
    border: 1px solid black;
    width: 2%;
  }
</style>
