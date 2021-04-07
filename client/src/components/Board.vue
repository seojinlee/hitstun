<template>
  <div>
    <section class="HUD">
      <div class="content columns">
        <div class="column is-half">
          <div class="health">
            <h5>Health: {{this.players[0].health}}</h5>
          </div>
          <div class="burst">
            <h5>Burst: {{this.players[0].burst}}</h5>
          </div>
          <div class="supercharge">
            <h5>Super Charge: {{this.players[0].supercharge}}</h5>
          </div>
        </div>
    
        <div class="column is-half">
          <div class="health">
            <h5>Health: {{this.players[1].health}}</h5>
          </div>
          <div class="burst">
            <h5>Burst: {{this.players[1].burst}}</h5>
          </div>
          <div class="supercharge">
            <h5>Super Charge: {{this.players[1].supercharge}}</h5>
          </div>
        </div>
      </div>
    </section>
    
    <section class="board">
      <div class="content">
    
        <div class="container">
          <div class="players-container">
            <div :id="players[0]._id" class="player player1" ref="player1" :style="playerStyles[0]">
              {{players[0].username}}
            </div>
    
            <div :id="players[1]._id" class="player player2" ref="player2" :style="playerStyles[1]">
              {{players[1].username}}
            </div>
          </div>
    
          <div class="spaces-container">
            <div class="end"></div>
            <div class="space"
              v-for="(space, index) in boardSpaces"
              v-bind:class="space"
              :key=index
              :ref=index>
              {{space}}
            </div>
            <div class="end"></div>
          </div>
        </div>
    
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'Board',
  props: ['player1', 'player2', 'stage'],

  data () {
    return {
      name: '', //dev-change
      room: {},
      boardSpaces: [],
      players: [
        {
          username: '',
          pos: null,
          vert: 0,
          cards: [],
          health: 15,
          burst: true,
          supercharge: 0,
          state: {
            hitstun: false,
            bind: false
          }
        },
        {
          username: '',
          pos: null,
          vert: 0,
          cards: [],
          health: 15,
          burst: true,
          supercharge: 0,
          state: {
            hitstun: false,
            bind: false
          }
        }
      ],
      playerStyles: [
        {
          left: '',
          top: ''
        },
        {
          left: '',
          top: ''}
      ]
    }
  },
  sockets: {
    turn (game) {
      console.log(game)
      console.log(this.players)
      // Play cards
      const turn = this.parseTurn(game.data[game.data.length-1])
      // Movement
      const newPos = this.getPos(turn)
      this.players[0].pos = newPos[0]
      this.players[0].vert = turn[0].player == 0 ? turn[0].action.card.movement.vertical : turn[1].action.card.movement.vertical
      this.players[1].pos = newPos[1]
      this.players[1].vert = turn[0].player == 1 ? turn[0].action.card.movement.vertical : turn[1].action.card.movement.vertical
      this.refresh()
      //Attack
      this.players[0].supercharge += turn[0].action.card.passive.supercharge
      this.players[1].supercharge += turn[1].action.card.passive.supercharge
      const playersHit = this.checkHit(turn)
      for (let i=0; i<2; i++) {
        if (playersHit[i]) this.activeEffects(turn, i)
      }
      console.log(playersHit)
      console.log('players: ', this.players)
      
    }
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    // BOARD CHANGES 
    refresh () {
      const refs = this.$refs
      const player1_pos = refs[this.players[0].pos][0].offsetLeft
      const player2_pos = refs[this.players[1].pos][0].offsetLeft
      const player1Height = this.$refs.player1.offsetHeight
      const player2Height = this.$refs.player2.offsetHeight
      const topSpace = refs[1][0].offsetTop
      const heightSpace = refs[1][0].offsetHeight
      const player1Vert = 1 - (this.players[0].vert +1)*0.5
      const player2Vert = 1 - (this.players[1].vert +1)*0.5
      this.playerStyles[0].left = player1_pos+'px'
      this.playerStyles[1].left = player2_pos+'px'
      this.playerStyles[0].top = topSpace + heightSpace*player1Vert - player1Height*player1Vert +'px'
      this.playerStyles[1].top = topSpace + heightSpace*player2Vert - player2Height*player2Vert +'px'
    },
    async animate () {
      const refs = this.$refs
      const player1_pos = refs[this.players[0].pos][0].offsetLeft
      const player2_pos = refs[this.players[1].pos][0].offsetLeft
      const player1diff = player1_pos - parseInt(this.playerStyles[0].left)
      const player2diff = player2_pos - parseInt(this.playerStyles[1].left)
      for (let i=0; i<=Math.max(Math.abs(player1diff), Math.abs(player2diff)); i++) {
        if (i<= Math.abs(player1diff) ) {
          this.playerStyles[0].left = (parseInt(this.playerStyles[0].left) +1*Math.sign(player1diff)) +'px'
        }
        if (i<= Math.abs(player2diff) ) {
          this.playerStyles[1].left = (parseInt(this.playerStyles[1].left) +1*Math.sign(player2diff)) +'px'
        }
        await this.sleep(3)
      }
      
      // this.playerStyles[0].left = player1_pos+'px'
      // this.playerStyles[1].left = player2_pos+'px'
    },
    //
    parseTurn (turn) {
      const turn_parsed = []
      turn_parsed.push(turn.p1)
      turn_parsed.push(turn.p2)
      return turn_parsed
    },
    getMoveDir (player) {
      const p1 = player == 0 ? 0 : 1
      const p2 = player == 0 ? 1 : 0
      var moveDir
      if (this.players[p1].pos < this.players[p2].pos) {
        moveDir = 1
      }
      else {
        moveDir = -1
      }
      return moveDir
    },
    moveIncrement (player, pos, move) {
      var moveDir = this.getMoveDir(player)
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
      player_move_count.push(turn[0].action.card.movement.lateral)
      player_move_count.push(turn[1].action.card.movement.lateral)
      const max_move = Math.max(Math.abs(turn[0].action.card.movement.lateral), Math.abs(turn[1].action.card.movement.lateral))
      // Incrementally move player until collsion
      for (let i=0; i<max_move; i++) {
        // When are is one space between players, heck for player collision
        if (Math.abs(new_player_pos[0] - new_player_pos[1])-1 < 2) {
          const potentialPos = [
            this.moveIncrement(0, new_player_pos[0], Math.sign(player_move_count[0])),
            this.moveIncrement(1, new_player_pos[1], Math.sign(player_move_count[1]))
          ]
          // If collision occurs, run collision resolution
          if (potentialPos[0] == potentialPos[1] || Math.sign(player_move_count[0]) == Math.sign(player_move_count[1])) {
            // Check if one player is airbourne
            if (turn[0].action.card.movement.vertical > 0 || turn[1].action.card.movement.vertical > 0) {
              if (!(turn[0].action.card.movement.vertical > 0 && turn[1].action.card.movement.vertical > 0)) {
                // Two players pass through
                for (let i=0; i<2; i++) {
                  new_player_pos[i] = this.moveIncrement(i, new_player_pos[i], Math.sign(player_move_count[i]))
                }
                // If this is the last increment, airbourne player lands on one space after opponent
                if (Math.abs(player_move_count[0]) + Math.abs(player_move_count[0]) == 0) {
                  for (let i=0; i<2; i++) {
                    if (turn[i].action.card.movement.vertical > 0) {
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
              console.log('no collision')
              new_player_pos[i] = this.moveIncrement(i, new_player_pos[i], Math.sign(player_move_count[i]))
            }
          }
        }
        else {
          for (let i=0; i<2; i++) {
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
    // ATTACK METHODS
    checkHit (turn) {
      const playersHit = [false, false]
      const vertical = {
        '-1': 'low',
        '0': 'mid',
        '1': 'high'
      }
      const hitAbsolute = [{}, {}]
      // Get hit target as absolute coordinates
      for (let i=0; i<2; i++) {
        Object.keys(turn[i].action.card.hit).forEach(key => {
          let index = this.players[i].pos + key*this.getMoveDir(i)
          hitAbsolute[i][index] = turn[i].action.card.hit[key]
        })
      }
      // Check if attack lands
      if (hitAbsolute[0][this.players[1].pos]) {
        if (turn[0].action.card.target[vertical[this.players[1].vert]]) {
          playersHit[1] = true
        }
      }
      if (hitAbsolute[1][this.players[0].pos]) {
        if (turn[1].action.card.target[vertical[this.players[0].vert]]) {
          playersHit[0] = true
        }
      }
      console.log(playersHit)
      // Check for block/unblockable
      if (playersHit[0] || playersHit[1]) {
        if (playersHit[0] && turn[0].action.card.passive.block) {
          if (turn[1].action.card.passive.unblockable) {
            playersHit[0] = true
          }
          else {
            playersHit[0] = false
            playersHit[1] = true
          }
        }
        else if (playersHit[1] && turn[1].action.card.passive.block) {
          if (turn[0].action.card.passive.unblockable) {
            playersHit[1] = true
          }
          else {
            playersHit[1] = false
            playersHit[0] = true
          }
        }
      }
      else {
        // If trade, check for prio
        if (playersHit[0] && playersHit[1]) {
          if (turn[0].action.card.prio > turn[1].action.card.prio) {
            playersHit[0] = true
            playersHit[1] = false
          }
          else if (turn[0].action.card.prio < turn[1].action.card.prio) {
            playersHit[0] = false
            playersHit[1] = true
          }
          else {
            playersHit[0] = true
            playersHit[1] = true
          }
        }
        // If trade, check for crush
        if (playersHit[0] && playersHit[1]) {
          if (turn[0].action.card.crush || turn[1].action.card.crush) {
            playersHit[0] = turn[0].action.card.crush
            playersHit[1] = turn[0].action.card.crush
          }
          else if (turn[0].action.card.crush && turn[1].action.card.crush) {
            playersHit[0] = true
            playersHit[1] = true
          }
          else {
            playersHit[0] = true
            playersHit[1] = true
          }
        }
      }
      return playersHit
    },
    activeEffects (turn, i) {
      console.log("active effects")
      console.log(this.players[0].vert, this.players[1].vert)
      const opp = i == 0 ? 1 : 0
      this.players[i].health -= turn[opp].action.card.active.damage
      this.players[i].pos -= turn[opp].action.card.active.displace.lateral * this.getMoveDir(opp)*-1
      this.players[i].vert = turn[opp].action.card.active.displace.vertical 
    }
  },

  async mounted () {
    this.name = this.$store.state.user // dev-change
  },

  updated () {
  },

  watch: {
    player1 () {
      this.players[0]._id = this.player1._id
      this.players[0].username = this.player1.username

      this.players[0].character = this.player1.character
      this.players[0].cards = this.player1.character.cards
    },
    player2 () {
      this.players[1]._id = this.player2._id
      this.players[1].username = this.player2.username

      this.players[1].character = this.player2.character
      this.players[1].cards = this.player2.character.cards
    },
    async stage () {
      for (var i=0; i < (this.stage.size*2); i++) {
        if (i== (this.stage.size - this.stage.neutral_pos) || i == this.stage.size + this.stage.neutral_pos -1) {
          this.boardSpaces.push('N')
        }
        else if (i==0 || i == (this.stage.size*2) -1 ) {
          this.boardSpaces.push('W')
        }
        else {
          this.boardSpaces.push('')
        }
      }
      this.players[0].pos = this.stage.size - this.stage.neutral_pos
      this.players[1].pos = this.stage.size + this.stage.neutral_pos -1

      while (!this.$refs[0]) {
        await this.sleep(100)
      }
      this.refresh()
    }
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
  .player {
    position: absolute;
    width: 10%;
    text-align: center;
    left: 50%;
    transition: left 0.8s, top 0.3s;
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
