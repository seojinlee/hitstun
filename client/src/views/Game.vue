<template>
  <section>
    <div class="container">
      <Board :player1='p1' :player2='p2' :stage='stage'/>
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
      

      if  (this.room.players.p1.username == this.name) {
        this.cards = this.room.players.p1.character.cards
        this.player = this.room.players.p1
      }
      else if  (this.room.players.p2.username == this.name) {
        this.cards = this.room.players.p2.character.cards
        this.player = this.room.players.p2
      }

      this.character = (await GameService.getCharacter('605b11ddd37af9220cc6b41b')).data
      this.cards = this.character.cards
      this.activeCards = this.cards
    }
  },
  async created () {
    this.room = (await GameService.getRoom(this.$route.params.room)).data
    this.p1_character = (await GameService.getCharacter('605b11ddd37af9220cc6b41b')).data
    this.p2_character = (await GameService.getCharacter('605b11ddd37af9220cc6b41b')).data
    this.stage = this.room.stage
    this.p1 = this.room.players.p1
    this.p2 = this.room.players.p2

    this.name = this.$store.state.user
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
