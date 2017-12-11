<template>
    <div class="container" id="leaderboard-container">
		<h3>test</h3>
		<table>
				<tr>
				<th>Username</th>
				<th>Score</th>
			</tr>
			<div v-for="player in players">
				<tr>
					<th>{{player.username}}</th>
					<th>{{player.score}}</th>
				</tr>
			</div>
		</table>
    </div>
</template>

<script>
import api from '../util/ajaxAPI.js';

export default {
    name : 'Leaderboard',
	data () {
		return {
			players : [],
		}
	},
	created : function(){
		this.reload();
	},
	watch : {
		'$route.params.gameId' : function(id) {
			this.reload();
		}
	},
	methods : {
			reload : function() {
			console.log(this.$route.params.gameId);
				this.api.getPlayerScores(this.$route.params.gameId)
                .then(function(data){
                    this.players = data;
                }.bind(this));
			}
		}
}
</script>

<style>

</style>
