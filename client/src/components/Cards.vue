<template>
  <section class="cards">
    <div class="cards-container" :class="{super: isSuper}"
      v-if="!playerState.state.hitstun">

      <div class="columns">
        
        <div class="cloumn is-3 buttons" >
          <b-field>
            <b-button type="is-danger" expanded :disabled="isSuper">Burst</b-button>
            <b-button type="is-warning" expanded>Super</b-button>
          </b-field>
        </div>

        <div class="column cards">
          <div class="card-p" 
            v-for="card in cards"
            :key=card._id
            @click="playCard(card._id)">
            <span class="card-text">{{card.name}}</span>
            <img src="../assets/card_template.png">
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
//import GameService from '@/services/GameService'

export default {
  name: 'Cards',
  props: ['playerInfo', 'playerState', 'cards'],

  data () {
    return {
      name: '', //dev-change
      character: {},
      activeCards: [],
      supercharge: 0,
      burst: false,
      actions: [],
      blankCard: {
        movement: {
          lateral: 0,
          vertical: 0
        },
        hit: {},
        cooldown: -1,
        supercharge_cost: 0,
        passive: {
          supercharge: 0
        },
        target: {}
      },
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
        id: this.name
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
    playerState () {
      console.log('cards', this.playerState.state.hitstun)
      if (this.playerState.state.hitstun) {
        console.log('socket emit turnready')
        this.$socket.emit('turnReady', {
          action: {
            card: this.blankCard,
            supermove: false,
            burst: false
          },
          id: this.name,
        })
      }
    }
  },
  computed: {
    isSuper () {
      if (this.playerState.supercharge >= 3) {
        return true
      }
      else {
        return false
      }
    }
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
  .content {
  }
  .cards-container {
    padding: 0px 80px;
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: red;
  }
  .super {
    background-color: yellow;
  }
  .buttons {
  }
  .cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
  }
  .card-p {
    position: relative;
    width: 100px;
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