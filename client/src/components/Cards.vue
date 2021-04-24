<template>
  <section class="cards">
    <div class="cards-container"
      v-if="!playerState.state.hitstun">

      <div class="columns">
        
        <div class="cloumn is-3 buttons" >
          <b-button type="is-danger" expanded 
            :disabled="burstDisable">
            Burst
          </b-button>
          <b-button type="is-warning" expanded 
            :disabled="superDisable"
            @click="enable_super">
            Super
          </b-button>
        </div>

        <div class="column cards">
          <div class="card-p"
            v-for="card in playerState.cards"
            :class="{isSuper: isSuper}"
            :key=card._id
            @click="playCard(card)">
            <img :src="imageUrl(card.photo)">
          </div>
        </div>

      </div>

    </div>
    <b-modal v-model="isModalActive" scroll="keep">
      <div class="modal-card">
        <div class="modal-card-content">
          <div class="card-super supermove"  @click="superMove(-1)">
            <img src="@/assets/Basic/SDB.png">
          </div>
          <div class="card-super supermove"  @click="superMove(1)">
            <img src="@/assets/Basic/SDI.png">
          </div>
          <div class="card-super supercard"
            v-if="playerState.supercharge > playerState.superCard.supercharge_cost"
             @click="playCard(playerState.superCard)">
            <img :src="imageUrl(playerState.superCard.photo)">
          </div>
        </div>
      </div>
    </b-modal>

  </section>
</template>

<script>
//import GameService from '@/services/GameService'

export default {
  name: 'Cards',
  props: ['playerInfo', 'playerState'],

  data () {
    return {
      name: '', //dev-change
      isSuper: false,
      burst: false,
      burstDisable: false,
      superDisable: true,
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
      isModalActive: false,
    }
  },
  methods: {
    playCard (card) {
      const action = {
        card: card,
        supermove: this.supermove,
        burst: this.burst
      }
      this.$socket.emit('turnReady', {
        action: action,
        id: this.name
      })

      this.supermove = 0
      this.isSuper = false
      this.isModalActive = false

      if (this.burst) {
        this. burstDisable = true
        this.burst = false
      }

    },
    enable_super () {
      if (this.playerState.supercharge > 2) {
        this.superDisable = true
        this.isModalActive = true
      }
    },
    superMove (move) {
      this.supermove = move
      this.isSuper = true
      this.isModalActive = false
    },
    imageUrl (path) {
      return require("@/assets" + path)
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

      if (this.playerState.supercharge < 3) {
        this.superDisable = true
      }
      else {
        this.superDisable = false
      }
    }
  },
  computed: {
  },
  created () {
    this.name = this.$store.state.user
    console.log(this.name)
  }
}
</script>

<style scoped>
  .content {
  }
  .cards-container {
    min-width: 100vw;
    padding: 0 100px;
    display: flex;
    justify-content: flex-end;
  }
  .columns {
    flex-grow: 1;
  }
  img {
    transition: 0.3s;
  }
  .isSuper > img {
    box-shadow: 
      0px 0px 10px 5px #FFE000,
      inset 0 0 0px 5px #FFE000;
    transition: 0.3s;
  }
  .buttons {
    margin-top: auto;
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
    margin: 0 10px;
    cursor: pointer;
    align-self: flex-end;
    transition: 0.2s;
  }
  .card-p:hover {
    width: 120px;
    margin: 0 0px;
    transition: 0.3s;
  }
  .modal-card {
    width: 100%;
    align-items: center;
  }
  .card-super {
    margin: 30px;
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  .card-super > img:hover {
    box-shadow: 0px 0px 15px 5px #FFE000;
    transition: 0.3s;
  }
  .img {
    box-shadow: 0 0 0 0;
  }

  .card-transition-enter-active, .card-transition-leave-active {
    transition: opacity;
  }
</style>