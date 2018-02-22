<template>
  <div id="app">
    <button class="mdc-button mdc-button--raised mdc-ripple-upgraded" 
      style="--mdc-ripple-fg-size:60.2344px; --mdc-ripple-fg-scale:1.93661; --mdc-ripple-fg-translate-start:20.8828px, 1.60156px; --mdc-ripple-fg-translate-end:20.0781px, -12.1172px;">
                Start
    </button>

    <button disabled class="mdc-button mdc-button--raised mdc-ripple-upgraded" 
      style="--mdc-ripple-fg-size:60.2344px; --mdc-ripple-fg-scale:1.93661; --mdc-ripple-fg-translate-start:20.8828px, 1.60156px; --mdc-ripple-fg-translate-end:20.0781px, -12.1172px;">
                Stop
    </button>

    <ul class="mdc-list">
        <li class="mdc-list-item" v-for="item in items">
          {{ item }}
        </li>
    </ul>
  </div>
</template>

<script>
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
    }
  }
</script>

<style>
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
