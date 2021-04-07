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
//import GameService from '@/services/GameService'

export default {
  name: 'Cards',
  props: ['player', 'cards'],

  data () {
    return {
      name: '', //dev-change
      character: {},
      activeCards: [],
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
      this.$socket.emit('turnReady', {
        action: action,
        id: this.player.socket_id,
        playerState: {}
      })
    }
  },
  sockets: {
    async loadGame() {
      // this.player = player
      // console.log("player: ", this.player)
      // this.character = (await GameService.getCharacter(this.player.character)).data
      // this.character = (await GameService.getCharacter('605b11ddd37af9220cc6b41b')).data
      // this.cards = this.character.cards
      // this.activeCards = this.cards
    }
  },
  watch: {
  },
  created () {
    this.name = this.$store.state.user
    console.log(this.name)
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