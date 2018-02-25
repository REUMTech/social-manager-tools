<template>
    <div>
        <header class="mdc-toolbar mdc-elevation--z4">
            <div class="mdc-toolbar__row">
            <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
                <span class="mdc-toolbar__title catalog-title">Main</span>
            </section>
            </div>
        </header>
        <main class="main">
            <button class="mdc-button mdc-button--raised mdc-ripple-upgraded" 
            style="--mdc-ripple-fg-size:60.2344px; --mdc-ripple-fg-scale:1.93661; --mdc-ripple-fg-translate-start:20.8828px, 1.60156px; --mdc-ripple-fg-translate-end:20.0781px, -12.1172px;">
                        Start
            </button>

            <button disabled class="mdc-button mdc-button--raised mdc-ripple-upgraded" 
            style="--mdc-ripple-fg-size:60.2344px; --mdc-ripple-fg-scale:1.93661; --mdc-ripple-fg-translate-start:20.8828px, 1.60156px; --mdc-ripple-fg-translate-end:20.0781px, -12.1172px;">
                        Stop
            </button>
        </main>
    </div>
</template>

<style scoped>
    .main {
        padding: 10px;
    }
</style>
