<template>
  <section>
    <div class="container">
      <Board/>
      <Cooldowns/>
      <Cards/>
    </div>
  </section>
</template>


<script>
import Board from '@/components/Board.vue'
import Cooldowns from '@/components/Cooldowns.vue'
import Cards from '@/components/Cards.vue'

export default {
  components: {
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
