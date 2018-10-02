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
  article:()=> import('@/views/article'),
  reviseuser:()=> import('@/views/reviseuser'),

  
}

const router = new Router({
  routes: [
    {
      path: '/',
      meta:{
        title:'首页'
      },
      component: index
    },
    {
      path: '/register',
      meta:{
        title:'注册页'
      },
      component: components.register
    },
    {
      path: '/writenote',
      meta:{
        title:'写笔记页'
      },
      component: components.writenote
    },
    {
      path: '/notelist',
      meta:{
        title:'笔记列表页'
      },
      component: components.notelist
    },
    {
      path: '/article',
      meta:{
        title:'笔记详情页'
      },
      component: components.article
    },
    {
      path: '/reviseuser',
      meta:{
        title:'修改个人信息页'
      },
      component: components.reviseuser
    }
  ]
})

router.beforeEach((to,from,next) =>{
  if (to.meta && to.meta.title){
      document.title = to.meta.title
  }
  next()
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  next()
})
router.afterEach( (to, from) => {
  Nprogress.done()
})
export default router
