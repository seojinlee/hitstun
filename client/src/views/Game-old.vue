<template>
  <section>
    <div class="container">
      <Board :player1Info='player1Info' :player2Info='player2Info' :playersUpdate='playersUpdate' :stage='stage' v-on:playerState='playerState($event)'/>
      <Cooldowns />
      <Cards :player='player' :cards='cards' />
    </div>
  </section>
</template>


<script>
import Board from '@/components/Board.vue'
import Cooldowns from '@/components/Cooldowns.vue'
import Cards from '@/components/Cards.vue'

import GameService from '@/services/GameService'

export default {
  components: {
    Board,
    Cooldowns,
    Cards
  },
  data () {
    return {
      room: {},
      player: {},
      player1Info: {},
      player2Info: {},
      playersUpdate: {},
      p1: {},
      p2: {},
      cards: [],
      stage: {},
      name: ''
    }
  },
  sockets: {
    async loadGame() {
      // this.player = player
      // console.log("player: ", this.player)
      // this.character = (await GameService.getCharacter(this.player.character)).data
      console.log(this.room)
      
    },
    async update (game) {
      console.log('update: ', game)
      this.playersUpdate = {
        p1: game.data[game.data.length-1].p1.playerState,
        p2: game.data[game.data.length-1].p2.playerState
      }

      if  (this.room.players.p1.username == this.name) {
        this.cards = game.data[game.data.length-1].p1.playerState.cards
        console.log(this.cards.length)
      }
      else if  (this.room.players.p2.username == this.name) {
        this.cards = game.data[game.data.length-1].p2.playerState.cards
        console.log(this.cards.length)
      }
    }
  },
  methods: {
    playerState(playerState) {
      this.$socket.emit('updatePlayerState', playerState)
    }
  },
  async created () {
    this.name = this.$store.state.user

    this.room = (await GameService.getRoom(this.$route.params.room)).data
    this.player1Info = this.room.players.p1
    this.player2Info = this.room.players.p2
    this.stage = this.room.stage


    if  (this.room.players.p1.username == this.name) {
      this.cards = this.room.players.p1.character.cards
      this.player = this.room.players.p1
    }
    else if  (this.room.players.p2.username == this.name) {
      this.cards = this.room.players.p2.character.cards
      this.player = this.room.players.p2
    }

    this.playersUpdate = {
      p1: this.room.data[0].p1.playerState,
      p2: this.room.data[0].p2.playerState
    }

    this.playersUpdate.p1.cards = this.room.players.p1.character.cards
    this.playersUpdate.p2.cards = this.room.players.p2.character.cards

    this.$socket.emit('loadGame', this.name)
  }
}
</script>

<style>
  .container {}
  h5 {
    font-family: 'Paladins Condensed Condensed';
  }
</style>
