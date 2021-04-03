<template>
  <section>

    <div class="container">
      <h1 class="title is-4">Update Characters</h1>

      <div class="columns">

        <div class="column is-one-quarter">
          
          <div class="container">
            <b-table
              :data="characters"
              :columns="charactersColumns"
              :selected.sync="selected"
              style="cursor: pointer"
              hoverable
            >
            </b-table>
          </div>

        </div>
        
        <div class="column is-half">

          <div class="container">
            <b-field horizontal label="Name">
              <b-input name="Name" v-model="characterToUpdate.name" :value="selected.name" expanded></b-input>
            </b-field>
            
            <b-field horizontal label="Description">
              <b-input type="textarea" v-model="characterToUpdate.description" :value="selected.description"></b-input>
            </b-field>
            
            <b-field horizontal label="Version">
              <b-input name="version" v-model="characterToUpdate.version" :value="selected.version"></b-input>
            </b-field>
            
            <b-field horizontal>
              <p class="control">
                <b-button label="Update" type="is-info" @click="updateCharacter()"/>
              </p>
            </b-field>
          </div>

        </div>

        <div class="column">
          <div class="container">
            <b-field>
              <b-table
                :data="selected.cards"
                :columns="cardsColumns"
                narrowed
              >
              </b-table>
            </b-field>
            <div class="buttons" v-if="selected.name">
              <b-button label="Manage" type="is-success" @click="isCardModalActive = true"/>
            </div>
          </div>
        </div>

      </div>
    </div>

    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <b-field>
            <b-table
              :data="cards"
              :columns="addCardsColumns"
              :checked-rows.sync="checkedCards"
              checkable
              searchable>
            </b-table>
          </b-field>
          <b-button label="Update" type="is-info" @click="updateCards()"/>
        </div>
      </div>
    </b-modal>

  </section>
</template>

<script>

export default {
  name: 'Characters',
  props: ['characters', 'cards'],
  data () {
    return {
      selected: {},
      checkedCards: [],

      charactersColumns: [
        {
          field: 'name',
          label: 'Characters',
        },
      ],
      cardsColumns: [
        {
          field: 'name',
          label: 'Cards',
        },
      ],
      addCardsColumns: [
        {
          field: 'name',
          label: 'Cards (Search below)',
          searchable: true
        },
      ],

      characterToUpdate: {},

      isCardModalActive: false
    }
  },
  methods: {
    deleteCharacter () {
      this.$buefy.dialog.confirm({
          title: 'Deleting character',
          message: 'Are you sure you want to <b>delete</b> these characters? This action cannot be undone.',
          confirmText: 'Delete',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            this.checkedRows = []
            this.$emit('deleteCharacter', this.checkedRows)
            this.$buefy.toast.open('Characters deleted!')
          }
      })
    },
    updateCharacter () {
      console.log(this.characterToUpdate)
    },
    updateCards () {

    }
  },
  watch: {
    selected () {
      this.characterToUpdate = {...this.selected}
      this.checkedCards = []

      this.cards.forEach(card => {
        this.selected.cards.forEach(selectedCard => {
          if (card._id === selectedCard._id) this.checkedCards.push(card)
        })
      })
    },
    checkedCards () {
      console.log(this.checkedCards)
    }
  }
}
</script>

<style scoped>
</style>
