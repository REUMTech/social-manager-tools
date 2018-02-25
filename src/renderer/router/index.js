import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Main').default
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/Settings').default
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/components/About').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
