<template>
  <section class="cooldowns">

    <div class="cooldown-container">

      <!-- <div class="cooldown-row">
        <div class="cooldown c-1">
          <b-tag class="card-tag is-dark"
            v-for="card in p1_c1" :key="'p1_'+card.name">
            {{card.name}}
          </b-tag>
        </div>
        <div class="cooldown c-2">
          <b-tag class="card-tag is-dark"
            v-for="card in p1_c2" :key="'p1_'+card.name">
            {{card.name}}
          </b-tag>
        </div>
        <div class="cooldown c-3">
          <b-tag class="card-tag is-dark"
            v-for="card in p1_c3" :key="'p1_'+card.name">
            {{card.name}}
          </b-tag>
        </div>
        <div class="cooldown c-4">
          <b-tag class="card-tag is-dark"
            v-for="card in p1_c4" :key="'p1_'+card.name">
            {{card.name}}
          </b-tag>
        </div>
      </div> -->

      <div class="cooldown-labels">
        <div class="row">
          <div class="cooldown-label"> 1 </div>
          <div class="cooldown-label"> 2 </div>
          <div class="cooldown-label"> 3 </div>
          <div class="cooldown-label"> 4 </div>
        </div>
        <h1 class="cooldown-text">COOLDOWNS</h1>
      </div>

      <div class="card-set-container">
        <div class="card-set"><img src="@/assets/card_template.png"></div>
        <div class="card-set"><img src="@/assets/card_template.png"></div>
      </div>

      <div class="cooldown-labels">
        <div class="row">
          <div class="cooldown-label"> 1 </div>
          <div class="cooldown-label"> 2 </div>
          <div class="cooldown-label"> 3 </div>
          <div class="cooldown-label"> 4 </div>
        </div>
        <h1 class="cooldown-text">COOLDOWNS</h1>
      </div>
    </div>

    

  </section>
</template>

<script>
export default {
  name: 'Cooldowns',
  props: ['players'],

  data () {
    return {
    }
  },
  computed: {
    p1_c4 () {
      const c = []
      this.players[0].cooldowns.forEach(card => {
        if (card.cooldown == 4) {
          c.push(card)
        }
      })
      return c

    },
    p1_c3 () {
      const c = []
      this.players[0].cooldowns.forEach(card => {
        if (card.cooldown == 3) {
          c.push(card)
        }
      })
      return c

    },
    p1_c2 () {
      const c = []
      this.players[0].cooldowns.forEach(card => {
        if (card.cooldown == 2) {
          c.push(card)
        }
      })
      return c
    },
    p1_c1 () {
      const c = []
      this.players[0].cooldowns.forEach(card => {
        if (card.cooldown == 1) {
          c.push(card)
        }
      })
      return c
    },

    p2_c4 () {
      const c = []
      this.players[1].cooldowns.forEach(card => {
        if (card.cooldown == 4) {
          c.push(card)
        }
      })
      return c

    },
    p2_c3 () {
      const c = []
      this.players[1].cooldowns.forEach(card => {
        if (card.cooldown == 3) {
          c.push(card)
        }
      })
      return c

    },
    p2_c2 () {
      const c = []
      this.players[1].cooldowns.forEach(card => {
        if (card.cooldown == 2) {
          c.push(card)
        }
      })
      return c
    },
    p2_c1 () {
      const c = []
      this.players[1].cooldowns.forEach(card => {
        if (card.cooldown == 1) {
          c.push(card)
        }
      })
      return c
    }
  }
}
</script>


<style scoped>
  .cooldowns {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    height: 20vw;
    align-items: flex-end;
  }
  .cooldown-container {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-flow: row nowrap;
    align-items: flex-end;
  }
  .cooldown-labels {
  }
  .row {
    min-width: 30vw;
    display: flex;
  }
  .cooldown-label {
    border: 3px solid white;
    background-color: rgba(164, 176, 190, 0.6);
    border-radius: 0.5vw;
    color: white;
    text-align: center;
    color: white;
    margin: 0.1vw;
    flex-grow: 1;
  }
  .card-set-container {
    display: flex;
    flex-flow: row nowrap;
    margin: 1vw 2vw;
  }
  .card-set {
    position: relative;
    width: 6vw;
  }
  .cooldown-text {
    margin-top: 8px;
    flex-grow: 1;
    text-align: center;
    color: white;
  }
  .cooldown {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 3px;
    justify-content: flex-end;
  }
  .card-tag {
    margin: 2px;
    border-radius: 4px;
    background-color: #363636;
    font-size: 0.75rem;
    padding: 0 0.75rem 0 0.75rem;
    align-items: center;
    text-align: center;
    color: white;
  }
</style>
