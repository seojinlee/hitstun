<template>
  <section class="cards">
    <div class="content">
      <div class="cards-container">
        <div class="card-p"
          v-for="card in cards"
          :key=card._id
          @click="playCard(card._id)">
          <span class="card-text">{{card.name}}</span>
          <img src="../assets/card_template.png">
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
      player: {},
      name: '', //dev-change
      character: {},
      cards: [],
      supermove: 0,
      burst: false,
      actions: []
    }
  },
  methods: {
    playCard (id) {
      const cardIndex = this.cards.findIndex(card => card._id === id)

      const action = {
        card: this.cards[cardIndex],
        supermove: this.supermove,
        burst: this.burst
      }
      this.$socket.emit('turnReady', {action, name: this.name})
    }
  },
  sockets: {
    async loadGame() {
      // this.player = player
      // console.log("player: ", this.player)
      // this.character = (await GameService.getCharacter(this.player.character)).data
      this.character = (await GameService.getCharacter('605b1170d37af9220cc6b418')).data
      this.cards = this.character.cards
    }
  },
  async created () {
    this.name = this.$store.state.user
    this.$socket.emit('loadGame', this.name)
  }
}
</script>

<style scoped>
  .cards {
    margin-top: 30px;
  }
  .cards-container {
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 0px;
    left: 0px;
  }
  .card-p {
    position: relative;
    width: 11%;
    margin: 2px;
    cursor: pointer;
    align-self: flex-end;
    transition: 0.2s;
  }
  .card-p:hover {
    width: 13%;
    transition: 0.3s;
  }
  .card-text {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .img {
    box-shadow: 0 0 0 0;
  }
</style>
