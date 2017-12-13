<template>
    <div class="container" id="leaderboard-container">
	
		<div class="col">
			<h3 v-if="game == undefined">Üldine edetabel</h3>
			<h3 v-else>{{game.name}}</h3>
		</div>

		<div class="col">
			<div class="btn btn-success btn-group">
				<a :href="'mailto:' + emails.join(';')">
					Saada email valitud kasutajatele
				</a>
			</div>
		</div>
		
		<div class="col">
			<table>
				<tr class="column-titles">
					<th>Koht</th>
					<th>Kasutajanimi</th>
					<th>Punktid</th>
					<th>Email</th>
					<th>Vali, et saata email</th>
				</tr>
				<tr v-for="(player, index) in players">
					<th>{{index+1}}</th>
					<th>{{player.user.username}}</th>
					<th>{{player.score}}</th>
					<th>{{player.user.email}}</th>
					<th><input type="checkbox" name="Send email" :value="player.user.email" @click="addEmail"></th>
				</tr>
			</table>
		</div>
    </div>
</template>

<script>
import api from '../util/ajaxAPI.js';

export default {
    name : 'Leaderboard',
	data () {
		return {
			players : [],
			game : undefined,
			emails : [],
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
			addEmail : function() {
				var checkedUser = event.target;
				var checkedUserEmail = checkedUser.value;
				if (checkedUser.checked) {
					this.emails.push(checkedUserEmail);
				} else {
					this.emails = this.emails.filter(item => item !== checkedUserEmail)
				}
			},
			reload : function() {
				if (this.$route.params.gameId != "all") {
					this.api.gameById(this.$route.params.gameId)
					.then(function(data) {
						this.game = data;
					}.bind(this));
				} else {
					this.game = undefined;
				}
				
				this.api.getGameLeaderboard(this.$route.params.gameId)
                .then(function(data){
                    this.players = data.players;
                }.bind(this));
				
				
			}
		}
}
</script>

<style>

table {
	width: 100%;
}

.col {
	padding-bottom: 10px;
}

.column-titles{
	background-color: #F7BE81;
}
	
th {
	height: 30px;
	text-align : left;
	padding-left: 10px;
}
	
table, th, tr {
   border: 1px solid;
}

</style>
