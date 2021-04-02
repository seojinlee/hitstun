<template>
  <section>

    <div class="container">
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
                <b-input name="Name" :value="checkedCharacter.name" expanded></b-input>
              </b-field>
              
              <b-field horizontal label="Description">
                <b-input type="textarea" :value="checkedCharacter.description"></b-input>
              </b-field>
              
              <b-field horizontal label="Version">
                <b-input name="version" :value="checkedCharacter.version"></b-input>
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
                  :selected.sync="selected"
                  narrowed
                >
                </b-table>
              </b-field>
            </div>
          </div>

        </div>
    </div>

  </section>
</template>

<script>

export default {
  name: 'Characters',
  props: ['characters'],
  data () {
    return {
      selected: {},

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
      newCharacter: {}
    }
  },
  methods: {
    deleteCharacter() {
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
    }
  },
  computed: {
    checkedCharacter () {
      return this.selected
    }
  }
}
</script>

<style scoped>
</style>
