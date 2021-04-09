<template>
  <section class="cooldowns">

    <div class="columns">
      <div class="column is-half">
        <div class="cooldown-container">

          <div class="cooldown-row left">
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
          </div>

          <div class="cooldown-row left">
            <div class="cooldown-text"> 1 </div>
            <div class="cooldown-text"> 2 </div>
            <div class="cooldown-text"> 3 </div>
            <div class="cooldown-text"> 4 </div>
          </div>

        </div>

        <h1 class="text-left">COOLDOWNS</h1>
      </div>

      <div class="column is-half">
        <div class="cooldown-container">

          <div class="cooldown-row right">
            <div class="cooldown c-4">
              <b-tag class="card-tag is-dark"
                v-for="card in p2_c4" :key="'p2_'+card.name">
                {{card.name}}
              </b-tag>
            </div>
            <div class="cooldown c-3">
              <b-tag class="card-tag is-dark"
                v-for="card in p2_c3" :key="'p2_'+card.name">
                {{card.name}}
              </b-tag>
            </div>
            <div class="cooldown c-2">
              <b-tag class="card-tag is-dark"
                v-for="card in p2_c2" :key="'p2_'+card.name">
                {{card.name}}
              </b-tag>
            </div>
            <div class="cooldown c-1">
              <b-tag class="card-tag is-dark"
                v-for="card in p2_c1" :key="'p2_'+card.name">
                {{card.name}}
              </b-tag>
            </div>
          </div>

          <div class="cooldown-row right">
            <div class="cooldown-text"> 4 </div>
            <div class="cooldown-text"> 3 </div>
            <div class="cooldown-text"> 2 </div>
            <div class="cooldown-text"> 1 </div>
          </div>

        </div>

        <h1 class="text-right">COOLDOWNS</h1>
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
    margin-top: 100px;
  }
  .cooldown-container {
  }
  .cooldown-row {
    width: 100%;
    display: flex;
  }
  .left {
    justify-content: flex-start;
  }
  .right {
    justify-content: flex-end;
  }
  .cooldown-text {
    border: 1px solid black;
    text-align: center;
    width: 22%;
    margin: -0.5px;
  }
  .cooldown {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 22%;
    padding: 3px;
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
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
</style>
