import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main.vue'
import Games from '@/components/Games.vue'
import Destinations from '@/components/Destinations.vue'
import Users from '@/components/Users.vue'
import SingleGame from '@/components/Singlegame.vue'
import CreateGame from '@/components/CreateGame.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/games',
      name: 'Games',
      component: Games,
      children : [
        {
          path : ':id',
          component : SingleGame
        }
      ] 
    },
    {
      path: '/destinations',
      name: 'Destinations',
      component : Destinations
    },
    {
      path: '/users',
      name: 'Users',
      component : Users
    },
    {
      path : '/create-game',
      name : 'NewGame',
      component : SingleGame,
    }
  ]
})