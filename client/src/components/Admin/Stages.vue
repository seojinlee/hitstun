<template>
  <section>

    <div class="container">
      <h1 class="title is-4">Update Stages</h1>
      <div class="columns">

        <div class="column is-one-quarter">
          
          <div class="container">
            <b-field>
              <b-table
                :data="stages"
                :columns="stagesColumns"
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
            <b-field horizontal label="Name">
              <b-input
                name="Name"
                v-model="stageToUpdate.name"
                :value="selected.name"
                expanded>
              </b-input>
            </b-field>
            
            <b-field horizontal label="Description">
              <b-input
                type="textarea"
                v-model="stageToUpdate.description"
                :value="selected.description">
              </b-input>
            </b-field>

            <b-field horizontal label="Stage Effect">
              <b-input 
                v-model="stageToUpdate.stage_effect_name"
                :value="selected.stage_effect_name">
              </b-input>
            </b-field>

            <b-field horizontal label="Size">
              <b-input
                v-model="stageToUpdate.size"
                :value="selected.size">
              </b-input>
            </b-field>

            <b-field horizontal label="Neutral Position">
              <b-input
                v-model="stageToUpdate.neutral_pos"
                :value="selected.neutral_pos">
              </b-input>
            </b-field>
            
            <b-field horizontal label="Version">
              <b-input
                name="version"
                v-model="stageToUpdate.version"
                :value="selected.version">
              </b-input>
            </b-field>
            
            <b-field horizontal>
              <p class="control">
                <b-button label="Update" type="is-info" @click="updateStage()"/>
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
  name: 'Stages',
  props: ['stages'],
  data () {
    return {
      selected: {},

      stagesColumns: [
        {
          field: 'name',
          label: 'Stages',
        },
      ],

      stageToUpdate: {}
    }
  },
  methods: {
    deleteStage () {
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
    updateStage () {

    }
  },
  watch: {
    selected () {
      this.stageToUpdate = {...this.selected}
    }
  }
}
</script>

<style scoped>
</style>
