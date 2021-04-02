<template>
  <section class="cooldowns">

    <div class="columns">
      <div class="column is-half">
        <div class="cooldown-container">

          <div class="cooldown-row left">
            <div class="cooldown c-1">
              <b-tag class="card-tag is-dark ">
                Front Step
              </b-tag>
            </div>
            <div class="cooldown c-2"></div>
            <div class="cooldown c-3"></div>
            <div class="cooldown c-4">
              <b-tag class="card-tag is-dark">
                Front Step
              </b-tag>
              <div class="card-tag is-dark">
                Dash Attack Updated
              </div>
            </div>
          </div>

          <div class="cooldown-row left">
            <div class="cooldown-text"> 1 </div>
            <div class="cooldown-text"> 2 </div>
            <div class="cooldown-text"> 3 </div>
            <div class="cooldown-text"> 4 </div>
          </div>

        </div>

        <h1 class="text-left">COOLDOWNS</h1>
      </div>

      <div class="column is-half">
        <div class="cooldown-container">

          <div class="cooldown-row right">
            <div class="cooldown c-4">
              <b-tag class="card-tag is-dark ">
                Front Step
              </b-tag>
            </div>
            <div class="cooldown c-3"></div>
            <div class="cooldown c-2"></div>
            <div class="cooldown c-1">
              <b-tag class="card-tag is-dark">
                Front Step
              </b-tag>
              <div class="card-tag is-dark">
                Dash Attack Updated
              </div>
            </div>
          </div>

          <div class="cooldown-row right">
            <div class="cooldown-text"> 4 </div>
            <div class="cooldown-text"> 3 </div>
            <div class="cooldown-text"> 2 </div>
            <div class="cooldown-text"> 1 </div>
          </div>

        </div>

        <h1 class="text-right">COOLDOWNS</h1>
      </div>
    </div>

  </section>
</template>

<style scoped>
  .cooldowns {
    width: 100%;
    padding: 10px;
    margin-top: 100px;
  }
  .cooldown-container {
  }
  .cooldown-row {
    width: 100%;
    display: flex;
  }
  .left {
    justify-content: flex-start;
  }
  .right {
    justify-content: flex-end;
  }
  .cooldown-text {
    border: 1px solid black;
    text-align: center;
    width: 22%;
    margin: -0.5px;
  }
  .cooldown {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 22%;
    padding: 3px;
  }
  .card-tag {
    margin: 2px;
    border-radius: 4px;
    background-color: #363636;
    font-size: 0.75rem;
    padding: 0 0.75rem 0 0.75rem;
    align-items: center;
    text-align: center;
    color: white;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
</style>
