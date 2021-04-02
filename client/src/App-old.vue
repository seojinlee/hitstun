<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/room">Room</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
     data () {
      return {
        username: '',
        error: null,
      }
    }
  }
</script>

<style>
@import "https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"

#app {
}
section {
}
.container {
  padding: 18px;
}
</style>

