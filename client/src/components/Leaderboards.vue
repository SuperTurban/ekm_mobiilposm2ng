<template>
    <div class="container" id="leaderboards-container">
       <div class="row">
         <div class="col-4 games-list">
			<div class="general-scores">
				<router-link :to="'/app/leaderboards/all'" class="btn btn-outline-dark btn gamelink">
					General scores
				</router-link>
			</div>
            <div v-for="game in games" class="game-name-wrapper">
                <router-link :to="'/leaderboards/'+game.id" :data-name="game.name" class="btn btn-outline-dark btn gamelink">
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
      games : []
    }
  },
  created : function(){
      this.api.listGames()
        .then(function(data){
            this.games = data;
        }.bind(this))

  }
}
</script>

<style>
.general-scores {
	clear:both;
}
</style>
