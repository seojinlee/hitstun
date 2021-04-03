<template>
  <div>
    <b-tabs>
      <b-tab-item label="Update">
        <Characters :characters="characters" :cards="cards" v-on:deleteCharacter="deleteCharacter($event)"/>
        <hr>
        <Cards :cards="cards" v-on:deleteCards="deleteCards($event)"/>
        <hr>
        <Stages :stages="stages" v-on:deleteStage="deleteStage($event)"/>
      </b-tab-item>
      <b-tab-item label="Add">
        <AddNew 
          v-on:addCharacter="addCharacter($event)"
          v-on:addCard="addCard($event)"
          v-on:addStage="addStage($event)"
        />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import Characters from '@/components/Admin/Characters.vue'
import Cards from '@/components/Admin/Cards.vue'
import Stages from '@/components/Admin/Stages.vue'
import AddNew from '@/components/Admin/AddNew.vue'

import AdminService from '@/services/AdminService'

export default {
  components: {
    Characters,
    Cards,
    Stages,
    AddNew
  },
  data () {
    return {
      cards: [],
      characters: [],
      stages: []
    }
  },
  methods: {
    addCharacter: async function (character) {
      this.characters = (await AdminService.addCharacter(character)).data
    },
    updateCharacter (characters) {
      console.log('update: ', characters)
    },
    deleteCharacter (characters) {
      console.log('delete: ', characters)
    },

    addCard: async function (card) {
      this.cards = (await AdminService.addCard(card)).data
    },
    updateCard (cards) {
      console.log('update cards: ', cards)
    },

    deleteCard (cards) {
      console.log('delete: ', cards)
    },
    
    addStage: async function (stage) {
      this.stages = (await AdminService.addStage(stage)).data
    },
    updateStage (stages) {
      console.log('update stage: ', stages)
    },
    deleteStage (stages) {
      console.log('delete: ', stages)
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