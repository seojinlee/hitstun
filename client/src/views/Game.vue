<template>
  <div class="game">
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
            <div :id="playersInfo[0].socket_id" class="player player1" ref="player1" :style="playerStyles[0]">
              <img :src="characterImageUrl(playersInfo[0].character.character_card)">
            </div>
    
            <div :id="playersInfo[1].socket_id" class="player player2" ref="player2" :style="playerStyles[1]">
              <img :src="characterImageUrl(playersInfo[1].character.character_card)">
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

    <Cooldowns :players='players'/>
    <Cards :playerInfo='playerInfo' :playerState='playerState' />

  </div>
</template>

<script>
import Cooldowns from '@/components/Cooldowns.vue'
import Cards from '@/components/Cards.vue'

import GameService from '@/services/GameService'


export default {
  components: {
    Cooldowns,
    Cards
  },

  data () {
    return {
      name: '', //dev-change
      room: {},
      stage: {},
      playerInfo: {},
      playerState: {},

      boardSpaces: [],
      playersInfo: [],
      players: [
        {
          pos: null,
          vert: 0,
          cards: [],
          superCard: {},
          cooldowns: [],
          health: 15,
          burst: true,
          supercharge: 0,
          state: {
            hitstun: false,
            bind: false
          }
        },
        {
          pos: null,
          vert: 0,
          cards: [],
          superCard: {},
          cooldowns: [],
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
    async update (game) {
      const turn = game.data[game.data.length-1]

      this.players = [
       turn.p1.playerState,
       turn.p2.playerState
      ]
      this.players[0].vert = 0
      this.players[1].vert = 0


      console.log('update: ', this.players)

      await this.sleep(200)
      await this.refresh()

    },
    async turn (game) {
      console.log('game: ', game)
      console.log('players: ', this.players)

      this.players[0].state.hitstun = false
      this.players[1].state.hitstun = false

      // Play cards
      const turn = this.parseTurn(game.data[game.data.length-1])
      console.log(turn)
      // Supercharge cost
      for (let i=0; i<2; i++) {
        if (turn[i].action.supermove) {
          this.players[i].supercharge -= 3
          turn[i].action.card.movement.lateral += turn[i].action.supermove
          console.log('supermove', turn[i].action.card.movement.lateral)
        }
        this.players[i].supercharge -= turn[i].action.card.supercharge_cost
      }


      // Movement
      const newPos = this.getPos(turn)
      console.log('movement: ', newPos)
      this.players[0].pos = newPos[0]
      this.players[0].vert = turn[0].action.card.movement.vertical
      this.players[1].pos = newPos[1]
      this.players[1].vert = turn[1].action.card.movement.vertical

      await this.refresh()
      console.log('attack phase')
      //Attack
      this.players[0].supercharge += turn[0].action.card.passive.supercharge
      this.players[1].supercharge += turn[1].action.card.passive.supercharge
      const playersHit = this.checkHit(turn)

      console.log('playersHit: ', playersHit)

      this.activeEffects(turn, playersHit)

      console.log('manage cards phase')
      this.manageCards(turn)
      
    }
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    // BOARD CHANGES 
    refresh () {
      return new Promise (resolve => {
        const refs = this.$refs
        const player1_pos = refs[this.players[0].pos][0].offsetLeft
        const player2_pos = refs[this.players[1].pos][0].offsetLeft
        const heightSpace = refs[1][0].offsetHeight
        const player1_vert = this.players[0].vert * -1*heightSpace*0.3
        const player2_vert = this.players[1].vert * -1*heightSpace*0.3

        var leftTransition = true
        var topTransition = true

        if (parseInt(this.playerStyles[0].left) == parseInt(player1_pos) && parseInt(this.playerStyles[1].left) == parseInt(player2_pos)) leftTransition = false
        if (parseInt(this.playerStyles[0].top) == parseInt(player1_vert) && parseInt(this.playerStyles[1].top) == parseInt(player2_vert)) topTransition = false

        this.playerStyles[0].left = player1_pos+'px'
        this.playerStyles[1].left = player2_pos+'px'
        this.playerStyles[0].top = player1_vert +'px'
        this.playerStyles[1].top = player2_vert +'px'

        if (leftTransition || topTransition) {
          const transitionEnded = e => {
            if (e.propertyName !== 'left' && e.propertyName !== 'top') return;
              this.$refs.player1.removeEventListener('transitionend', transitionEnded);
              this.$refs.player2.removeEventListener('transitionend', transitionEnded);
              resolve();
            }
          this.$refs.player1.addEventListener('transitionend', transitionEnded);
          this.$refs.player2.addEventListener('transitionend', transitionEnded);
        }
        else {
          resolve()
        }
      })
    },
    characterImageUrl (path) {
      return require('@/assets/characters' + path)
    },
    async damageShake (p) {
      const player = p == 0 ? 'player1' : 'player2'
      console.log('damage shake: ', player)
      const playerLeft = parseInt(this.playerStyles[p].left)

      const interval = 60
      const distance = 8
      const times = 3

      for (var i = 0; i < (times + 1); i++) {
        this.$refs[player].animate({
          left: (playerLeft + (i % 2 == 0 ? distance : distance * -1)) + 'px'
        }, interval);
        await this.sleep(60)
      }

    },
    //
    parseTurn (turn) {
      const turn_parsed = []
      turn_parsed.push(turn.p1)
      turn_parsed.push(turn.p2)
      return turn_parsed
    },
    getMoveDir (player) {
      const p = player == 0 ? 0 : 1
      const opp = player == 0 ? 1 : 0
      var moveDir
      if (this.players[p].pos < this.players[opp].pos) {
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
          if (potentialPos[0] == potentialPos[1] || Math.sign(player_move_count[0]*this.getMoveDir(0)) == Math.sign(player_move_count[1]*this.getMoveDir(1))) {
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
      }
      return playersHit
    },
    async activeEffects (turn, playersHit) {
      console.log("active effects")

      for (let i=0; i<2; i++) {
        if (playersHit[i]) {
          const opp = i == 0 ? 1 : 0
          this.players[i].health -= turn[opp].action.card.active.damage

          await this.damageShake(i)

          if (!turn[i].action.card.passive.tenacity) {
              this.players[i].pos -= turn[opp].action.card.active.displace.lateral * this.getMoveDir(opp)*-1
              this.players[i].vert = turn[opp].action.card.active.displace.vertical
              this.players[i].state.bind = turn[opp].action.card.active.bind
              this.players[i].state.hitstun = turn[opp].action.card.active.hitstun
          }
        }
      }
    },

    async manageCards (turn) {
      const playerState = {
        p1: {},
        p2: {},
        id: this.name, //dev-change
        p: "" //dev-change
      }
      const playerCards = [
        this.room.players.p1.character.cards,
        this.room.players.p2.character.cards
      ]

      for (let i=0; i<2; i++) {
        const player = i==0 ? 'p1' : 'p2'
        const cardIndex = this.players[i].cards.findIndex(card => card._id == turn[i].action.card._id)
        const cooldowns = this.players[i].cards.splice(cardIndex, 1)[0]

        this.players[i].cooldowns.forEach((card, index) => {
          card.cooldown -= 1
          console.log('card off cooldown')
          if (card.cooldown < 1) {
            console.log(card._id, playerCards[i])
            let newCard = playerCards[i].find(c => c._id == card._id)
            console.log(newCard)
            this.players[i].cards.push(newCard)
            this.players[i].cooldowns.splice(index, 1)
          }
        })

        this.players[i].cooldowns.push(cooldowns)

        playerState[player] = this.players[i]
      }
      console.log(this.room.players)

      console.log('playerState: ', playerState)

      playerState.p1.vert = 0
      playerState.p2.vert = 0

      await this.sleep(800)

      this.$socket.emit('playerState', playerState)
      //this.$store.dispatch('playerState', playerState)
    }
  },

  async mounted () {
    window.addEventListener('resize', this.refresh)

    this.name = this.$store.state.user // dev-change
    this.room = (await GameService.getRoom(this.$route.params.room)).data

    this.playersInfo = [
      this.room.players.p1,
      this.room.players.p2
      ]
    this.stage = this.room.stage

    console.log('playersInfo', this.playersInfo)

    this.players[0] = this.room.data[0].p1.playerState,
    this.players[1] = this.room.data[0].p2.playerState

    this.players[0].cards = [...this.room.players.p1.character.cards]
    this.players[1].cards = [...this.room.players.p2.character.cards]


    const p1_super_i = this.players[0].cards.findIndex(card => card.card_type.super == true)
    const p2_super_i = this.players[1].cards.findIndex(card => card.card_type.super == true)

    this.players[0].superCard = this.players[0].cards.splice([p1_super_i], 1)[0]
    this.players[1].superCard = this.players[1].cards.splice([p2_super_i], 1)[0]

    if  (this.room.players.p1.username == this.name) {
      this.playerState = this.players[0]
      this.playerInfo = this.playersInfo[0]
    }
    else if  (this.room.players.p2.username == this.name) {
      this.playerState = this.players[1]
      this.playerInfo = this.playersInfo[1]
    }

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

    while (!this.$refs[0] || !this.players || !this.stage) {
      await this.sleep(50)
    }
    this.refresh()
  },

  updated () {
  },

  watch: {
    async players () { //dev-change
      if  (this.room.players.p1.username == this.name) {
        this.playerState = this.players[0]
      }
      else if  (this.room.players.p2.username == this.name) {
        this.playerState = this.players[1]
      }
    }
  }
}
</script>

<style scoped>
  .game {
    background-image: url("https://img.wallpapersafari.com/desktop/1920/1080/57/13/JOoBSz.jpg");
    height: 100%;
  }
  h5 {
    font-family: 'Paladins Condensed Condensed';
  }
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
    transition: left 0.6s, top 0.3s, font-size 0.3s;
  }
  .spaces-container {
    display: flex;
    justify-content: center;
  }
  .space {
    border: 0.2em solid white;
    background-color: rgba(255, 255, 255, .1);
    border-radius: 13px;
    margin: 0.2%;
    width: 10%;
    padding-bottom: 12%;
    font-family: 'Paladins Condensed Condensed';
  }
  .end {
    background-color: rgba(255, 255, 255, .3);
    border: 0.2em solid white;
    border-radius: 3px;
    margin: 0.18%;
    width: 4%;
  }
</style>
