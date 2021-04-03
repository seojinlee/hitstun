<template>
  <section>
    <div class="container">
      <h1 class="title is-4"> Update Cards </h1>

      <div class="columns">

        <div class="column is-one-quarter">
          <div class="container">
            <b-field>
              <b-table
                :data="cards"
                :columns="cardsColumns"
                :selected.sync="selected"
                style="cursor: pointer"
                hoverable
              >
              </b-table>
            </b-field>
          </div>
        </div>
        
        <div class="column three-quaters">
          <div class="container">      
            <b-field horizontal label="Object">
              <b-input
                type="textarea"
                v-model="cardToUpdate"
                :value="cardToUpdate"
                rows="15">
              </b-input>
            </b-field>
            
            <b-field horizontal>
              <p class="control">
                <b-button label="Update" type="is-info" @click="updateCard()"/>
              </p>
            </b-field>

          </div>
        </div>

      </div>
    </div>

  </section>
</template>

<script>

export default {
  name: 'Cards',
  props: ['cards'],
  data () {
    return {
      selected: {},

      cardsColumns: [
        {
          field: 'name',
          label: 'Cards',
        },
      ],
      cardToUpdate: '',
      jsonError: ''
    }
  },
  methods: {
    deleteCard () {
      this.$buefy.dialog.confirm({
          title: 'Deleting stage',
          message: 'Are you sure you want to <b>delete</b> these stages? This action cannot be undone.',
          confirmText: 'Delete',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            this.checkedRows = []
            this.$emit('deleteStage', this.checkedRows)
            this.$buefy.toast.open('Stages deleted!')
          }
      })
    },

    updateCard () {
      try {
        if (this.cardToUpdate == '') throw "Received empty input."
        console.log(JSON.parse(this.cardToUpdate))
      }
      catch (err) {
        this.jsonError = err
        this.throwJsonError()
      }
    },

    throwJsonError() {
      this.$buefy.dialog.alert({
        title: 'Error',
        message: this.jsonError,
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        ariaModal: true
      })
    }
  },
  watch: {
    selected () {
      this.cardToUpdate = JSON.stringify(this.selected, null, 4)
    }
  },
}
</script>

<style scoped>
</style>
