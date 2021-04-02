<template>
  <Characters :characters="characters" v-on:deleteCharacter="deleteCharacter($event)"/>
  <!-- <Cards/>
  <Stages/> -->
</template>

<script>
import Characters from '@/components/Admin/Characters.vue'
//import Cards from '@/components/Admin/Cards.vue'
//import Stages from '@/components/Admin/Stages.vue'

import AdminService from '@/services/AdminService'

export default {
  components: {
    Characters
  },
  data () {
    return {
      cards: [],
      characters: [],
      stages: []
    }
  },
  methods: {
    characterAdd (character) {
      console.log('new character added: ', character)
    },
    deleteCharacter (characters) {
      console.log('delete: ', characters)
    }
  },
  async created () {
    this.$socket.disconnect()

    this.cards = (await AdminService.getCards()).data
    this.characters = (await AdminService.getCharacters()).data
    this.stages = (await AdminService.getStages()).data
  }
}
</script>

<style scoped>

</style>