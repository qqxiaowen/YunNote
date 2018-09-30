import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import index from '@/views/index'

Vue.use(Router)
const components = {
  register:()=> import('@/views/register'),
  writenote:()=> import('@/views/writenote'),
  notelist:()=> import('@/views/notelist'),
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/register',
      name: 'register',
      component: components.register
    },
    {
      path: '/writenote',
      name: 'writenote',
      component: components.writenote
    },
    {
      path: '/notelist',
      name: 'notelist',
      component: components.notelist
    }
  ]
})
router.beforeEach((to, from, next) => {
  Nprogress.start()
  next()
})
router.afterEach( (to, from) => {
  Nprogress.done()
})
export default router
