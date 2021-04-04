<template>
  <section>

    <div class="container">
      <h1 class="title is-4">Add New Characters</h1>
      <b-field horizontal label="Name">
        <b-input name="Name" v-model="character.name" expanded></b-input>
      </b-field>
      <b-field horizontal label="Description">
        <b-input type="textarea" v-model="character.description"></b-input>
      </b-field>
      <b-field horizontal label="Version">
        <b-input name="version" v-model="character.vesion"></b-input>
      </b-field>

      <b-field horizontal>
        <p class="control">
          <b-button label="Add Character" type="is-success" @click="addCharacter()"/>
        </p>
      </b-field>
    </div>

    <hr>

    <div class="container">
      <h1 class="title is-4">Add New Card</h1>

      <b-field horizontal label="Object">
        <b-input
          type="textarea"
          :value="card"
          rows="15">
        </b-input>
      </b-field>
      <b-field horizontal>
        <p class="control">
          <b-button label="Add Card" type="is-success" @click="addCard()"/>
        </p>
      </b-field>

    </div>

    <hr>

    <div class="container">
      <h1 class="title is-4">Add New Stage</h1>
      <b-field horizontal label="Name">
        <b-input
          name="Name"
          v-model="stage.name"
          expanded>
        </b-input>
      </b-field>

      <b-field horizontal label="Description">
        <b-input
          type="textarea"
          v-model="stage.description">
        </b-input>
      </b-field>

      <b-field horizontal label="Stage Effect">
        <b-input 
          v-model="stage.stage_effect_name">
        </b-input>
      </b-field>

      <b-field horizontal label="Size">
        <b-input
          v-model="stage.size" type="number">
        </b-input>
      </b-field>

      <b-field horizontal label="Neutral Position">
        <b-input
          v-model="stage.neutral_pos" type="number">
        </b-input>
      </b-field>
      
      <b-field horizontal label="Version">
        <b-input
          name="version"
          v-model="stage.version">
        </b-input>
      </b-field>
      
      <b-field horizontal>
        <p class="control">
          <b-button label="Add Stage" type="is-success" @click="addStage()"/>
        </p>
      </b-field>
    </div>

  </section>
</template>

<script>
export default {
  data () {
    return {
      character: {},
      card: 
      `{
          "movement": {
              "lateral": 1,
              "vertical": 0
          },
          "hit": {
              "1": false,
              "2": false,
              "3": false,
              "4": false,
              "5": false,
              "6": false,
              "7": false
          },
          "active": {
              "displace": {
                  "lateral": 0,
                  "vertical": 0
              },
              "hitstun": false,
              "damage": 0
          },
          "passive": {
              "unblockable": false,
              "supercharge": 0,
              "block": false
          },
          "target": {
              "high": false,
              "mid": false,
              "low": false
          },
          "assoc": "Basic",
          "crush": false,
          "timer": 0,
          "name": "Front Step",
          "card_type": "Move",
          "prio": 0,
          "cooldown": 0,
          "version": 1.4
      }`,
      stage: {},

      error: '',
    }
  },
  methods: {
    addCharacter () {
      try {
        if (!(this.character.name)) throw "Name required."

        this.$emit('addCard', this.character)
      }
      catch (err) {
        this.error = err,
        this.throwError()
      }
    },
    addCard () {
      try {
        if (this.card == '') throw "Received empty input."
          
        this.$emit('addCard', JSON.parse(this.card))
      }
      catch (err) {
        this.error = err
        this.throwError()
      }
    },
    addStage () {
      try {
        console.log(this.stage)
        if (!(this.stage.name)) throw "Stage name required."
        if (!(this.stage.size)) throw "Stage size required."
        if (!(this.stage.neutral_pos)) throw "Stage neutral position required."

        this.$emit('addStage', this.stage)
      }
      catch (err) {
        this.error = err,
        this.throwError()
      }
    },

    throwError() {
      this.$buefy.dialog.alert({
        title: 'Error',
        message: this.error,
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
  }
}
</script>

<style scoped>
</style>