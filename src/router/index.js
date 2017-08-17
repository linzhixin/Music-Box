import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import singerDetails from '@/components/singerDetails'
import songPlay from '@/components/songPlay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/singerDetails',
      name: 'singerDetails',
      component: singerDetails
    },
    {
      path: '/songPlay',
      name: 'songPlay',
      component: songPlay
    }   

  ]
})
