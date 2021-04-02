<template>
  <section>
    <h1>Lobby</h1>
    <div class="container">
      <div class="content columns">
        <div class="column is-half input-field">
          <b-field grouped position="is-left" label="Name">
            <b-input class="username" :disabled="true" v-model="user.username"></b-input>
          </b-field>
          <b-switch :disabled="disableToggle" v-model="playing">
              Playing
          </b-switch>
          <hr>
          <b-field position="is-left" label="Character">
            <b-select :disabled="!playing" placeholder="Select a character" v-model="charSelect">
              <option
                v-for="character in characters"
                :value="character._id"
                :key="character.name">
                {{character.name}}
              </option>
            </b-select>
          </b-field>
          <hr>
          <b-field position="is-left" label="Stage">
            <b-select :disabled="!playing" placeholder="Select a stage" v-model="stageSelect">
              <option
                v-for="stage in stages"
                :value=stage._id
                :key=stage._id>
                {{stage.name}}
              </option>
              <option value="random">Random</option>
            </b-select>
          </b-field>
          
          <br>
          <b-field>
            <p class="control">
              <b-button class="button is-primary" @click="enter()" :disabled="ready">
                Ready
              </b-button>
            </p>
          </b-field>

          <div class="readyMsg">
            <p v-if="ready">
              {{waitMsg}}
            </p>
          </div>

        </div>
        <div class="column is-half">
          <b-notification :closable="false" class="status-board">
            <h5>Players</h5>
            <b-taglist>
              <b-tag :type="player.color" size="is-medium"
                v-for="player in players"
                :key=player.id>
                {{player.username}}
              </b-tag>
            </b-taglist>
            <hr>
            <h5>Spectators</h5>
            <b-taglist>
              <b-tag :type="spectator.color" size="is-medium"
                v-for="spectator in spectators"
                :key=spectator.id>
                {{spectator.username}}
              </b-tag>
            </b-taglist>
          </b-notification>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LobbyService from '@/services/LobbyService'

export default {
  data () {
    return {
      user: {},
      room: {},
      charSelect: '',
      stageSelect: 'random',
      characters: [],
      stages: [],
      spectators: [],
      players: [],
      disableToggle: false,
      playing: false,
      ready: false,
      waitMsg: '',
      error: null
    }
  },
  methods: {
    enter: function () {
      this.ready = true
      this.disableToggle = true
      this.$socket.emit('ready', 
        {
          playing: this.playing,
          character: this.charSelect,
          stage: this.stageSelect
        })
    }
  },
  sockets: {
    message: function (message) {
      console.log('message: ', message)
    },
    user: function (user) {
      this.user = user
      console.log('user: ', user)
    },
    newPlayerJoined: function () {
      this.$socket.emit('stageSelect', this.stageSelect)
    },
    roomUsers: function (room) {
      console.log('room: ', room)
      this.room = room
      this.players = []
      this.spectators = []
      room.players.forEach(player => {
        player.playing ? this.players.push(player) : this.spectators.push(player)
      })
    },
    stageSelect: function (stage) {
      this.stageSelect = stage
      console.log(this.stageSelect)
    },
    ready ({startGame, playersNotReady}) {
      if (startGame) {
        this.waitMsg = "Starting game..."
      }
      else {
        const usernames = []
        playersNotReady.forEach(player => {
          usernames.push(player.username);
        })
        
        const usernamesStr = usernames.join(', ')
        this.waitMsg = 'Waiting for ' + usernamesStr + '...'
      }
    },
    async createGame({roomName, players, stage}) {
        const gameData = {roomName, players, stage}
        await LobbyService.createGame(gameData)
        this.$socket.emit('startGame')
    },
    startGame() {
      this.$router.push({
        name: 'Game',
        params: {
          room: this.room.room
        }
      })
    }
  },
  async created () {
    this.$socket.connect()
    this.user.username = this.$store.state.user

    this.room = (await LobbyService.getRoom()).data
    this.characters = (await LobbyService.getCharacters()).data
    this.stages = (await LobbyService.getStages()).data

    this.$socket.emit('joinRoom', {
      username: this.user.username,
      room: this.room.room
    })
    this.$socket.on('message', message => {
      console.log(message)
    })
  },
  watch: {
    playing () {
      if (!this.playing) this.charSelect = ''
      this.$socket.emit('lobby', this.playing)
    },
    charSelect () {

    },
    stageSelect () {
      this.$socket.emit('stageSelect', this.stageSelect)
    },
    players () {
      if (this.players.length > 1 && !this.playing) {
        this.disableToggle = true
      }
      else {
        this.disableToggle = false
      }
    }
    //this.$socket.emit('playerLeave', this.username)
  }
}
</script>

<style scoped>
.content {
  padding: 0 200px;
}
.content > div {
  margin: 0 20px;
}
.dropdown {
  margin-top: 30px;
}
.status-board {
  height: 100%;
}
.readyMsg {
  height: 0px;
  color: red;
}
.username {
  width: 100%;
}
</style>
