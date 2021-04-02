<template>
  <section>
    <div class="container">
      <HUD/>
      <Board/>
      <Cooldowns/>
      <Cards/>
    </div>
  </section>
</template>


<script>
import HUD from '@/components/HUD.vue'
import Board from '@/components/Board.vue'
import Cooldowns from '@/components/Cooldowns.vue'
import Cards from '@/components/Cards.vue'

export default {
  components: {
    HUD,
    Board,
    Cooldowns,
    Cards
  },
  data () {
    return {
    }
  },
  async created () {

  }
}
</script>

<style>
  .container {}
  h5 {
    font-family: 'Paladins Condensed Condensed';
  }
</style>
