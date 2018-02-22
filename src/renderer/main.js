import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'material-components-web/dist/material-components-web.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
// tada!

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
