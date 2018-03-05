<template>
    <div>
        <header class="mdc-toolbar mdc-elevation--z4">
            <div class="mdc-toolbar__row">
            <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
                <span class="mdc-toolbar__title catalog-title">Settings</span>
            </section>
            </div>
        </header>
        <main class="main">
            <div>
                <div class="section mdc-elevation--z8">
                    <h1 class="title mdc-typography--Headline">Instagram settings</h1>
                    <div class="mdc-text-field mdc-text-field--upgraded" id="username">
                        <input @input="saveToConfig" type="text" class="mdc-text-field__input" v-model="username" aria-controls="my-text-field-helper-text">
                        <label for="username" class="mdc-text-field__label">Username</label>
                        <div class="mdc-line-ripple" style="transform-origin: 96.5px center"></div>
                    </div>
                    <div class="mdc-text-field mdc-text-field--upgraded" id="password">
                        <input @input="saveToConfig" type="password" class="mdc-text-field__input" v-model="password" aria-controls="my-text-field-helper-text">
                        <label for="password" class="mdc-text-field__label">Password</label>
                        <div class="mdc-line-ripple" style="transform-origin: 96.5px center"></div>
                    </div>
                    <div class="mdc-text-field mdc-text-field--upgraded" id="tagsList">
                        <input @keydown="verifyTag" type="text" class="mdc-text-field__input" id="tags" aria-controls="my-text-field-helper-text">
                        <label for="tags" class="mdc-text-field__label">Add tags</label>
                        <div class="mdc-line-ripple" style="transform-origin: 96.5px center"></div>
                    </div>
                    <div class="mdc-chip-set">
                        <transition-group name="list" tag="div">
                            <span v-for="item in hashtags" v-bind:key="item" class="list-item">
                                <div  class="mdc-chip" tabindex="0">
                                    <div class="mdc-chip__text">{{ item }}</div>
                                    <i @click="removeHashtag(item)" class="material-icons mdc-chip__icon mdc-chip__icon--trailing" tabindex="0" role="button">cancel</i>
                                </div>
                            </span>
                        </transition-group>
                    </div>
                </div>
            </div>
            <div class="section-full  mdc-elevation--z8">
                <h1 class="title mdc-typography--Headline">Bot settings</h1>

                <div id="js-select" class="mdc-select" role="listbox">
                    <div class="mdc-select__surface mdc-ripple-upgraded" tabindex="0">
                        <div class="mdc-select__label">Bot mode</div>
                        <div class="mdc-select__selected-text"></div>
                        <div class="mdc-select__bottom-line"></div>
                    </div>
                    <div class="mdc-menu mdc-select__menu">
                        <ul class="mdc-list mdc-menu__items">
                            <li class="mdc-list-item" role="option" id="fruit-roll-ups" tabindex="0">
                            Classic
                            </li>
                            <li class="mdc-list-item" role="option" id="cotton-candy" tabindex="0">
                            Realistic
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </main>
    </div>
</template>

<script>
import {MDCSelect} from '@material/select'
import {MDCTextField} from '@material/textfield'
const config = require('electron').remote.getGlobal('config')

export default {
  mounted () {
    config.read().then((data) => {
      this.username = data.username
      this.password = atob(data.password)
      this.hashtags = data.hashtags
      MDCSelect.attachTo(this.$el.querySelector('.mdc-select'))
      MDCTextField.attachTo(this.$el.querySelector('#username')).value = this.username
      MDCTextField.attachTo(this.$el.querySelector('#password')).value = this.password
      MDCTextField.attachTo(this.$el.querySelector('#tagsList'))
    })
  },
  data: function () {
    return {
      username: '',
      password: '',
      hashtags: []
    }
  },
  methods: {
    saveToConfig: function () {
      const data = {
        username: this.username,
        password: this.password,
        hashtags: this.hashtags
      }
      config.write(data)
    },
    verifyTag: function (event) {
      event.target.value = event.target.value.trim()
      const isCommand = (event.code === 'Space' || event.code === 'Enter' || event.code === 'Comma')
      if (isCommand && event.target.value.length > 0) {
        this.addHashtag(event.target.value)
        event.target.value = ''
        event.preventDefault()
      }
    },
    addHashtag: function (tag) {
      if (!this.$data.hashtags.includes(tag)) {
        this.$data.hashtags.push(tag)
      }
      this.saveToConfig()
    },
    removeHashtag: function (tag) {
      const position = this.$data.hashtags.indexOf(tag)
      if (position > -1) {
        this.$data.hashtags.splice(position, 1)
      }
      this.saveToConfig()
    }
  }
}
</script>

<style scoped>
    .mdc-text-field {
        display: flex !important;
        width: 300px;
    }

    .mdc-select {
        width: 300px;
        display: flex !important;
    }

    .list-item {
    transition: all .4s;
    display: inline-block;
    margin-right: 10px;
    }
    .list-enter, .list-leave-to
    /* .list-complete-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(60px);
    }
    .list-leave-active {
    position: absolute;
    }

    .main {
        padding: 30px;
    }

    .section {
        padding: 50px;
        margin-bottom: 30px;
    }

    .section-full {
        display:block;
        padding: 50px;
    }
</style>

