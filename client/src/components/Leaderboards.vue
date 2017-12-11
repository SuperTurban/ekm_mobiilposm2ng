<template>
    <div class="container" id="leaderboards-container">
       <div class="row">
         <div class="col-4 games-list">
			<div class="general-scores" @click="clicked(0)">
				<router-link :to="'/leaderboards/all'" class="btn btn-outline-dark btn gamelink" v-bind:class="{ 'active' : activeEl == 0}">
					General scores
				</router-link>
			</div>
            <div v-for="(game, index) in games" class="game-name-wrapper" @click="clicked(index+1)">
                <router-link :to="'/leaderboards/'+game.id" :data-name="game.name" class="btn btn-outline-dark btn gamelink" v-bind:class="{ 'active' : activeEl == index+1}">
                  {{game.name}}
                </router-link>
            </div>
         </div>
       <div class="cur-leaderboard col-8">
           <router-view></router-view>
       </div>

       </div>
    </div>
</template>

<script>
export default {
  name: 'Games',  
  data () {
    return {
      games : [],
	  activeEl : 0,
    }
  },
  created : function(){
      this.api.listGames()
        .then(function(data){
            this.games = data;
        }.bind(this))

  },
  methods : {
  	clicked : function(el) {
	  this.activeEl = el;
	}
  }
}
</script>

<style>

</style>
