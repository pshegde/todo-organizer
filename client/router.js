import App from './App.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
let routes = [
  {
    path: '/tasks/:date',
    component: App,
    name: 'tasks'
  },
  {
    path: '/', redirect: '/tasks'
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router