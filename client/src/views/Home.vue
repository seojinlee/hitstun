<template>
  <section class="hero is-medium is-primary is-bold is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">

          <div class="column"></div>

          <div class="column is-one-third-desktop is-two-thirds-tablet is-full-width-mobile">
            <div class="card">
              <div class="card-content">
                <img src="">
                <h1 class="title has-text-primary has-text-centered is-size-1 has-text-weight-semibold">Login</h1>
                <div class="content">
                  <form
                    @submit="enter()">
                    <b-field>
                      <b-input placeholder="Username"
                        icon="account"
                        v-model="username">
                      </b-input>
                    </b-field>

                    <div class="error" v-html="error" />

                    <b-field>
                      <p class="control">
                        <b-button class="button is-primary" @click="enter()">
                          Login
                        </b-button>
                      </p>
                    </b-field>
                  </form>

                </div>
              </div>
            </div>
          </div>

          <div class="column"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data () {
    return {
      username: '',
      error: null,
    }
  },
  methods: {
    enter () {
      try {
        this.$store.dispatch('setUser', this.username)
        this.$router.push({
          name: 'Lobby'
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  },
  sockets: {
    connect: function () {
      console.log('Socket connected')
    }
  },
  created () {
    this.username = this.$store.state.user
    this.$socket.disconnect()
  }
  
  // name: 'Home',
  // components: {
  //   HelloWorld
  // }
}
</script>

<style scoped>
section {
  position: fixed;
  top: 0px;
  width: 100%;
}

img {
  height: 80px;
  display: block;
  margin: 0 auto;
}

.card-content {
  padding: 4rem 2rem;
}

.title {
  margin: 8px 0 60px 0;
}
</style>

