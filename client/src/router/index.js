import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main.vue'
import Games from '@/components/Games.vue'
import Destinations from '@/components/Destinations.vue'
import Users from '@/components/Users.vue'
import User from '@/components/User.vue'
import SingleGame from '@/components/Singlegame.vue'
import CreateGame from '@/components/CreateGame.vue'
import SingleDestination from '@/components/Singledestination.vue'
import Leaderboards from '@/components/Leaderboards.vue'
import Leaderboard from '@/components/Leaderboard.vue'

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
          name : 'singlegame',
          path : ':id',
          component : SingleGame
        }
      ] 
    },
    {
      path: '/destinations',
      name: 'Destinations',
      component : Destinations,
      children : [
        {
          name : 'singledestination',
          path : ':destinationId',
          component : SingleDestination,
        }
      ]
    },
    {
      path: '/users',
      name: 'Users',
      component : Users,
	  children : [
		{
		  name : 'singleuser',
		  path : ':userId',
		  component : User,
		}
	  ]
    },
    {
      path : '/create-game',
      name : 'NewGame',
      component : SingleGame,
    },
    {
      path : '/create-destination',
      name : 'NewDestination',
      component : SingleDestination,
    },
	{
	  path : '/leaderboards',
	  name : 'Leaderboards',
	  component : Leaderboards,
	  children : [
	  {
	     name : 'singleleaderboard',
		 path : ':gameId',
		 component : Leaderboard,
	  },
	  ]
	}
	]
})