import Vue from 'vue'
import Router from 'vue-router'
import BattleGround from '@/components/BattleGround'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BattleGround',
      component: BattleGround
    }
  ]
})
