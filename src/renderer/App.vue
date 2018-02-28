<template>
  <div id="app" class="mdc-typography demo-body">
    <nav id="demo-drawer" class="mdc-drawer mdc-drawer--permanent demo-drawer">
      <div class="mdc-list-group">
        <nav class="mdc-list">
          <router-link to="home" class="mdc-list-item mdc-list-item--selected">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">home</i>Main
          </router-link>
          <router-link to="settings" class="mdc-list-item">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">settings</i>Settings
          </router-link>
          <router-link to="about" class="mdc-list-item">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">help</i>About
          </router-link>
        </nav>
      </div>
    </nav>

    <div class="demo-content">
      <router-view></router-view>
    </div>
      
    <div id="snack" class="mdc-snackbar"
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden="true">
      <div class="mdc-snackbar__text"></div>
      <div class="mdc-snackbar__action-wrapper">
        <button type="button" class="mdc-snackbar__action-button"></button>
      </div>
    </div>
  </div>
</template>

<script>
  import {MDCSnackbar} from '@material/snackbar'
  const remote = require('electron').remote
  const likes = remote.getGlobal('likes')

  export default {
    data () {
      return {items: []}
    },
    mounted () {
      likes.subscribe((text) => {
        this.items.push('Like: ' + text)
      })
    },
    methods: {
      greet: function () {
        const snackbar = MDCSnackbar.attachTo(this.$el.querySelector('.mdc-snackbar'))
        snackbar.show({
          message: 'messageInput.value',
          actionText: 'Undo',
          actionHandler: function () {
            console.log('my cool function')
          }
        })
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }
  /* Ensure layout covers the entire screen. */
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>

<style scoped>
  #snack {
    z-index:2
  }

  #demo-drawer {
    max-width: 180px;
  }

  /* Place drawer and content side by side. */
  .demo-body {
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    min-height: 100%;
    width: 100%;
  }

  /* Stack toolbar and main on top of each other. */
  .demo-content {
    display: inline-flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    box-sizing: border-box;
  }

  /* Place drawer above toolbar shadow. */
  .mdc-drawer--permanent {
    z-index: 2;
  }

  #extra-wide-content {
    width: 200vw;
  }

  #extra-tall-content {
    height: 200vh;
  }
    

  :not(input):not(textarea),
  :not(input):not(textarea)::after,
  :not(input):not(textarea)::before {
      -webkit-user-select: none;
      user-select: none;
      cursor: default;
  }
  input, button, textarea, :focus {
      outline: none;
  }
</style>
