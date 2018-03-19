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
                        <input type="text" class="mdc-text-field__input" v-model="username" aria-controls="my-text-field-helper-text">
                        <label for="username" class="mdc-text-field__label">Username</label>
                        <div class="mdc-line-ripple" style="transform-origin: 96.5px center"></div>
                    </div>
                    <div class="mdc-text-field mdc-text-field--upgraded" id="password">
                        <input type="password" class="mdc-text-field__input" v-model="password" aria-controls="my-text-field-helper-text">
                        <label for="password" class="mdc-text-field__label">Password</label>
                        <div class="mdc-line-ripple" style="transform-origin: 96.5px center"></div>
                    </div>
                    <div class="mdc-text-field mdc-text-field--upgraded" id="tagsList">
                        <input v-stream:keydown="tagKeydown$" type="text" class="mdc-text-field__input" id="tags" aria-controls="my-text-field-helper-text">
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
            <div class="bot-settings section-full  mdc-elevation--z8">
                <h1 class="title mdc-typography--Headline">Bot settings</h1>

                <div id="js-select" class="select-mode-box mdc-select" role="listbox">
                    <div class="mdc-select__surface mdc-ripple-upgraded" tabindex="0">
                        <div class="mdc-select__label mdc-select__label--float-above">Bot mode</div>
                        <div class="mdc-select__selected-text"></div>
                        <div class="mdc-select__bottom-line"></div>
                    </div>
                    <div class="mdc-menu mdc-select__menu">
                        <ul class="mdc-list mdc-menu__items">
                            <li class="mdc-list-item" role="option" id="likemode_classic" tabindex="0">
                            Classic
                            </li>
                            <li class="mdc-list-item" role="option" id="likemode_realistic" tabindex="0">
                            Realistic
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="mdc-checkbox" id="checkbox-show-chrome">
                    <input v-stream:change="showChromeChange$" type="checkbox" id="showchrome-checkbox" class="mdc-checkbox__native-control">
                    <div class="mdc-checkbox__background">
                        <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                        <path class="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                        </svg>
                        <div class="mdc-checkbox__mixedmark"></div>
                    </div>
                </div>
                <label for="showchrome-checkbox" class="check-box-label">Show chrome</label>
            </div>
            <button @click="saveToConfig()" class="save-button mdc-button mdc-button--raised mdc-ripple-upgraded" 
            style="--mdc-ripple-fg-size:60.2344px; --mdc-ripple-fg-scale:1.93661; --mdc-ripple-fg-translate-start:20.8828px, 1.60156px; --mdc-ripple-fg-translate-end:20.0781px, -12.1172px;">
                        Save
            </button>
        </main>
    </div>
</template>

<script>
import {MDCSelect} from '@material/select'
import {MDCTextField} from '@material/textfield'
import {MDCCheckbox} from '@material/checkbox'

const config = require('electron').remote.getGlobal('config')

export default {
  props: ['snackbar'],
  domStreams: ['tagKeydown$', 'showChromeChange$'],
  subscriptions () {
    return {
      tagKeydown: this.tagKeydown$,
      showChromeChange: this.showChromeChange$
    }
  },
  mounted () {
    this.$subscribeTo(this.$observables.tagKeydown, this.verifyTag)
    this.$subscribeTo(config.changes, this.savedMessage, this.errorMessage)

    config.read().then((data) => {
      this.username = data.username
      this.password = data.password
      this.hashtags = data.hashtags
      this.mode = data.mode
      this.showChrome = data.showChrome

      let select = MDCSelect.attachTo(this.$el.querySelector('.mdc-select'))
      select.listen('MDCSelect:change', () => {
        this.mode = select.value
      })
      let i = 0
      select.options.forEach(element => {
        if (element.id === this.mode) {
          select.selectedIndex = i
        }
        ++i
      })

      const checkbox = MDCCheckbox.attachTo(this.$el.querySelector('#checkbox-show-chrome'))
      this.$subscribeTo(this.$observables.showChromeChange, () => {
        this.showChrome = checkbox.checked
      })
      checkbox.checked = data.showChrome
      MDCTextField.attachTo(this.$el.querySelector('#username')).value = this.username
      MDCTextField.attachTo(this.$el.querySelector('#password')).value = this.password
      MDCTextField.attachTo(this.$el.querySelector('#tagsList'))
    })
  },
  data: function () {
    return {
      username: '',
      password: '',
      hashtags: [],
      mode: '',
      showChrome: ''
    }
  },
  methods: {
    saveToConfig: function () {
      const data = {
        username: this.username,
        password: this.password,
        hashtags: this.hashtags,
        mode: this.mode,
        showChrome: this.showChrome
      }
      config.write(data)
    },
    savedMessage: function () {
      this.$props.snackbar.show({
        message: 'Changes Saved',
        actionText: 'Ok',
        actionHandler: function () {
        }
      })
    },
    errorMessage: function (err) {
      this.$props.snackbar.show({
        message: 'Error: ' + err,
        actionText: 'Ok',
        actionHandler: function () {
        }
      })
    },
    verifyTag: function (event) {
      event = event.event
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
    },
    removeHashtag: function (tag) {
      const position = this.$data.hashtags.indexOf(tag)
      if (position > -1) {
        this.$data.hashtags.splice(position, 1)
      }
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

    .bot-settings {
        margin-bottom: 30px;
    }

    .save-button {
        width: 250px;
    }
    
    .select-mode-box {
        margin-bottom: 40px;
    }

    .check-box-label {
        position: relative;
        top: -10px;
    }
</style>

