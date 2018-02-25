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
            <div class="mdc-text-field mdc-text-field--upgraded">
                <input required type="text" class="mdc-text-field__input" id="my-text-field" aria-controls="my-text-field-helper-text">
                <label for="my-text-field" class="mdc-text-field__label">Username</label>
                <div class="mdc-line-ripple" style="transform-origin: 96.5px center"></div>
            </div>
            <div class="mdc-text-field mdc-text-field--upgraded">
                <input required type="password" class="mdc-text-field__input" id="pw" aria-controls="my-text-field-helper-text">
                <label for="pw" class="mdc-text-field__label">Password</label>
                <div class="mdc-line-ripple" style="transform-origin: 96.5px center"></div>
            </div>
            <div id="js-select" class="mdc-select" role="listbox">
                <div class="mdc-select__surface mdc-ripple-upgraded" tabindex="0" style="width: 141px; --mdc-ripple-fg-size:100.2px; --mdc-ripple-fg-scale:1.85768; --mdc-ripple-fg-translate-start:28.9px, -11.2875px; --mdc-ripple-fg-translate-end:33.4px, -22.1px;">
                    <div class="mdc-select__label">Bot mode</div>
                    <div class="mdc-select__selected-text"></div>
                    <div class="mdc-select__bottom-line"></div>
                    </div>
                    <div class="mdc-menu mdc-select__menu" style="left: 48px; top: 461.188px; transform-origin: center 8px 0px;">
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
        </main>
    </div>
</template>

<script>
import {MDCSelect} from '@material/select'
import {MDCTextField} from '@material/textfield'

export default {
  mounted () {
    MDCSelect.attachTo(this.$el.querySelector('.mdc-select'))
    this.$el.querySelectorAll('.mdc-text-field').forEach(element => {
      MDCTextField.attachTo(element)
    })
  }
}
</script>

<style scoped>
    .main {
        padding: 30px;
    } 
</style>

