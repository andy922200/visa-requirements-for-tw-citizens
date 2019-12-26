import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import Countries from './views/Countries.vue'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Countries',
      component: Countries
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
      redirect: "/"
    }
  ]
})