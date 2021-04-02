<template>
  <section class="HUD">

    <div class="content columns">
      <div class="column is-half">
        <div class="health">
          <h5>Health: {{health}}</h5>
        </div>
        <div class="burst">
          <h5>Burst: {{burst}}</h5>
        </div>
        <div class="supercharge">
          <h5>Super Charge: {{supercharge}}</h5>
        </div>
      </div>

      <div class="column is-half">
        <div class="health">
          <h5>Health: {{health}}</h5>
        </div>
        <div class="burst">
          <h5>Burst: {{burst}}</h5>
        </div>
        <div class="supercharge">
          <h5>Super Charge: {{supercharge}}</h5>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  data () {
    return {
      health: 15,
      burst: true,
      supercharge: 5
    }
  },
  async created () {

  }
}
</script>

<style scoped>
</style>
