import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/HomePage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'HomePaje', component: Home }
  ]
})
